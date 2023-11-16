export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

enum ItemType {
  AgedBrie = 'Aged Brie',
  BackstagePasses = 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras = 'Sulfuras, Hand of Ragnaros',
  Conjured = 'Conjured',
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case ItemType.AgedBrie:
          this.updateAgedBrie(item);
          break;
        case ItemType.Sulfuras:
          break
        case ItemType.BackstagePasses:
          this.updateBackStagePasses(item);
          break;
        case ItemType.Conjured:
          this.updateConjured(item);
          break;
        default:
          this.updateNormalItem(item);
          break;
      }
    }

    return this.items;
  }

  private updateAgedBrie(item: Item) {
    if (item.quality < 50) {
      item.quality += 1;
    }

    item.sellIn -= 1;

    if (item.sellIn < 0 && item.quality < 50) {
      item.quality += 1;
    }
  }

  private updateBackStagePasses(item: Item) {
    if (item.quality < 50) {
      item.quality += 1;
      if (item.sellIn <= 10 && item.quality < 50) {
        item.quality += 1;
      }
      if (item.sellIn <= 5 && item.quality < 50) {
        item.quality += 1;
      }
    }

    item.sellIn -= 1;

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  private updateConjured(item: Item) {
    if (item.quality > 0) {
      item.quality -= 2;
    }

    item.sellIn -= 1;

    if (item.sellIn < 0 && item.quality > 0) {
      item.quality -= 2;
    }
  }

  private updateNormalItem(item: Item) {
    if (item.quality > 0) {
      item.quality -= 1;
    }

    item.sellIn -= 1;

    if (item.sellIn < 0 && item.quality > 0) {
      item.quality -= 1;
    }
  }
}
