import zlib
import struct
import math

def create_png(width, height, rgba_data):
    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

    header = b'\x89PNG\r\n\x1a\n'
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    
    raw = bytearray()
    for y in range(height):
        raw.append(0)
        start = y * width * 4
        raw.extend(rgba_data[start : start + width * 4])
        
    idat = zlib.compress(bytes(raw), 9)
    return header + chunk(b'IHDR', ihdr) + chunk(b'IDAT', idat) + chunk(b'IEND', b'')

def point_in_polygon(x, y, poly):
    inside = False
    n = len(poly)
    p1x, p1y = poly[0]
    for i in range(1, n + 1):
        p2x, p2y = poly[i % n]
        if y > min(p1y, p2y):
            if y <= max(p1y, p2y):
                if x <= max(p1x, p2x):
                    if p1y != p2y:
                        xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                    if p1x == p2x or x <= xinters:
                        inside = not inside
        p1x, p1y = p2x, p2y
    return inside

# Polygons on 1000x1000 coordinate system
poly_upper_roof = [
    (500, 126),
    (833, 459),
    (833, 874),
    (751, 874),
    (751, 493),
    (500, 242),
    (393, 349),
    (335, 291),
]

poly_white_square = [
    (246, 322),
    (304, 264),
    (362, 322),
    (304, 380),
]

poly_lower_outer = [
    (167, 459),
    (217, 409),
    (275, 467),
    (249, 493),
    (249, 792),
    (583, 792),
    (583, 704),
    (326, 704),
    (326, 540),
    (495, 371),
    (665, 540),
    (665, 874),
    (167, 874),
]

poly_inner_hole = [
    (495, 487),
    (583, 574),
    (583, 622),
    (408, 622),
    (408, 574),
]

def render_logo_png(size=512):
    BG = (24, 78, 82, 255)      # #184E52
    ORANGE = (236, 133, 62, 255) # #EC853E
    WHITE = (255, 255, 255, 255) # #FFFFFF

    scale = size / 1000.0
    SS = 2
    W_ss = size * SS
    H_ss = size * SS
    scale_ss = W_ss / 1000.0

    p_roof = [(p[0] * scale_ss, p[1] * scale_ss) for p in poly_upper_roof]
    p_white = [(p[0] * scale_ss, p[1] * scale_ss) for p in poly_white_square]
    p_lower = [(p[0] * scale_ss, p[1] * scale_ss) for p in poly_lower_outer]
    p_hole = [(p[0] * scale_ss, p[1] * scale_ss) for p in poly_inner_hole]

    # Render at SS resolution
    grid = bytearray(W_ss * H_ss) # 0: BG, 1: ORANGE, 2: WHITE

    for y in range(H_ss):
        row = y * W_ss
        for x in range(W_ss):
            px = x + 0.5
            py = y + 0.5
            if point_in_polygon(px, py, p_white):
                grid[row + x] = 2
            elif point_in_polygon(px, py, p_roof):
                grid[row + x] = 1
            elif point_in_polygon(px, py, p_lower):
                if not point_in_polygon(px, py, p_hole):
                    grid[row + x] = 1

    # Downsample with anti-aliasing
    rgba = bytearray(size * size * 4)
    ss_sq = SS * SS

    for y in range(size):
        row_y = y * size * 4
        base_y = y * SS
        for x in range(size):
            base_x = x * SS
            r_acc, g_acc, b_acc = 0, 0, 0
            for sy in range(SS):
                s_row = (base_y + sy) * W_ss
                for sx in range(SS):
                    val = grid[s_row + base_x + sx]
                    if val == 2: # White
                        r_acc += WHITE[0]
                        g_acc += WHITE[1]
                        b_acc += WHITE[2]
                    elif val == 1: # Orange
                        r_acc += ORANGE[0]
                        g_acc += ORANGE[1]
                        b_acc += ORANGE[2]
                    else: # BG
                        r_acc += BG[0]
                        g_acc += BG[1]
                        b_acc += BG[2]

            idx = row_y + x * 4
            rgba[idx] = r_acc // ss_sq
            rgba[idx + 1] = g_acc // ss_sq
            rgba[idx + 2] = b_acc // ss_sq
            rgba[idx + 3] = 255

    return create_png(size, size, rgba)

print("Generating 512x512 PNG...")
png_data = render_logo_png(512)

with open('public/logo_rofaarabic.png', 'wb') as f:
    f.write(png_data)

with open('src/assets/images/logo_rofaarabic.png', 'wb') as f:
    f.write(png_data)

print("Generated logo_rofaarabic.png successfully! Size:", len(png_data))
