"""Preparación reproducible de los fondos locales; conserva los PNG originales."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
backgrounds = root / 'assets/backgrounds'
names = {
    '00_35_55-1': 'bg-portada.webp',
    '00_35_56-2': 'bg-sobre-mi.webp',
    '00_35_57-3': 'bg-agradecimiento.webp',
    '00_35_58-4': 'bg-gustos.webp',
    '00_35_59-5': 'bg-carta.webp',
}
html = (root / 'index.html').read_text(encoding='utf-8')
for suffix, destination in names.items():
    sources = list(backgrounds.glob(f'*{suffix}.png'))
    if len(sources) != 1:
        raise RuntimeError(f'Fondo original no identificado: {suffix}')
    source = sources[0]
    with Image.open(source) as image:
        image.save(backgrounds / destination, 'WEBP', quality=90, method=6)
    html = html.replace('assets/backgrounds/' + source.name, 'assets/backgrounds/' + destination)
    print(f'{destination}: {source.stat().st_size} -> {(backgrounds / destination).stat().st_size} bytes')
(root / 'index.html').write_text(html, encoding='utf-8')
