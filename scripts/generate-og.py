"""Regenerates the social card and icon set in public/.

    python -I scripts/generate-og.py

Outputs (all under public/):
    og.png                1200x630  Open Graph / Twitter card
    favicon-48.png        48x48     tab icon
    icon-192.png          192x192   manifest icon
    icon-512.png          512x512   manifest icon
    apple-touch-icon.png  180x180   iOS home screen

The card uses the dark-theme Swiss tokens in src/index.css (paper, ink, blue accent).
Arial Bold stands in for the Inter grotesque, which is not installed here.
Needs Pillow.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
FONTS = Path("C:/Windows/Fonts")

PAPER = "#0A0F14"
INK = "#E3F2FD"
INK_MUTED = "#90A0B0"
ACCENT = "#2196F3"
ACCENT_TEXT = "#90CAF9"

W, H = 1200, 630
MARGIN = 72
BAND = 120  # accent band on the right edge


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS / name), size)


def tracked(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, f, fill, spacing: int) -> None:
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill)
        x += draw.textlength(ch, font=f) + spacing


def card() -> Image.Image:
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)

    d.rectangle([W - BAND, 0, W, H], fill=ACCENT)

    # Top row: label over a hairline
    tracked(d, (MARGIN, 56), "PORTFOLIO  /  URUGUAY", font("consola.ttf", 22), INK_MUTED, 3)
    d.line([(MARGIN, 104), (W - BAND - MARGIN, 104)], fill=INK, width=2)

    # Name, set tight
    name = font("arialbd.ttf", 176)
    d.text((MARGIN - 6, 120), "Facundo", font=name, fill=INK)
    d.text((MARGIN - 6, 288), "Presa", font=name, fill=INK)

    # The one accent square the site uses as ornament, scaled up
    presa_w = d.textlength("Presa", font=name)
    d.rectangle([MARGIN - 6 + presa_w + 20, 288 + 137, MARGIN - 6 + presa_w + 20 + 30, 288 + 137 + 30], fill=ACCENT)

    # Footer row: hairline, tagline, domain
    d.line([(MARGIN, 540), (W - BAND - MARGIN, 540)], fill=INK, width=2)
    d.text((MARGIN, 562), "Entrepreneur  ·  Design  ·  Programming", font=font("arial.ttf", 30), fill=INK)
    domain = "facupresa.com"
    f = font("consola.ttf", 30)
    d.text((W - BAND - MARGIN - d.textlength(domain, font=f), 562), domain, font=f, fill=ACCENT_TEXT)

    return img


def icons() -> dict[str, Image.Image]:
    logo = Image.open(PUBLIC / "logo.png").convert("RGB")
    sizes = {
        "favicon-48.png": 48,
        "icon-192.png": 192,
        "icon-512.png": 512,
        "apple-touch-icon.png": 180,
    }
    return {name: logo.resize((px, px), Image.LANCZOS) for name, px in sizes.items()}


def main() -> None:
    card().save(PUBLIC / "og.png", optimize=True)
    for name, img in icons().items():
        img.save(PUBLIC / name, optimize=True)
    for name in ["og.png", "favicon-48.png", "icon-192.png", "icon-512.png", "apple-touch-icon.png"]:
        print(f"{name}: {(PUBLIC / name).stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
