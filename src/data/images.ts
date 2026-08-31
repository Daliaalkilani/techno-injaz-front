/** Build an Unsplash image URL from a photo id. */
export function img(id: string, w = 1080, h = 720): string {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`
}

// Curated, thematically-appropriate photo ids grouped by subject.
export const photos = {
  robotics: [
    '1716191299980-a6e8827ba10b',
    '1655393001768-d946c97d6fd1',
    '1531746790731-6c087fecd65a',
    '1637002722490-5f8ceed9774c',
    '1643359905563-f747213c9703',
  ],
  electronics: [
    '1562408590-e32931084e23',
    '1518770660439-4636190af475',
    '1555664424-778a1e5e1b48',
    '1640955785023-1854685dae05',
    '1580584126903-c17d41830450',
    '1617839625591-e5a789593135',
  ],
  ai: [
    '1674027444485-cec3da58eef4',
    '1677442135703-1787eea5ce01',
    '1709120395858-92f1c7c577f5',
    '1677442135136-760c813028c0',
    '1677442136019-21780ecad995',
  ],
  lab: [
    '1581093577421-f561a654a353',
    '1581093449818-2655b2467fd6',
    '1766297247924-6638d54e7c89',
    '1669707040737-a6237bc0ae50',
  ],
  web: [
    '1547658719-da2b51169166',
    '1467232004584-a241de8bcf5d',
    '1460925895917-afdab827c52f',
    '1481487196290-c152efe083f5',
  ],
  business: [
    '1554224155-6726b3ff858f',
    '1460925895917-afdab827c52f',
    '1551288049-bebda4e38f71',
  ],
  ecommerce: [
    '1441986300917-64674bd600d8',
    '1556742049-0cfed4f6a45d',
    '1607082348824-0a96f2a4b9da',
    '1522335789203-aabd1fc54bc9',
  ],
  people: [
    '1519085360753-af0119f7cbe7',
    '1500648767791-00dcc994a43e',
    '1494790108377-be9c29b29330',
    '1507003211169-0a1dd7228f2d',
    '1544005313-94ddf0286df2',
    '1506794778202-cad84cf45f1d',
  ],
}
