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

  private readonly DEFAULT_QUALITY_CHANGE = 1;
  private readonly EXPIRED_QUALITY_CHANGE = this.DEFAULT_QUALITY_CHANGE * 2;
  private readonly MAX_QUALITY = {
    DEFAULT: 50,
    SULFURAS: 80,
  };

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
          // Legenday item, no need to update
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

      this.validateQualityBounds(item);
      this.updateSellIn(item);
    }

    return this.items;
  }

  private updateAgedBrie(item: Item) {
    if (item.quality < 50) {
      item.quality += this.DEFAULT_QUALITY_CHANGE;
    }
  }

  private updateBackStagePasses(item: Item) {
    if (item.sellIn <= 0) {
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      item.quality += 3;
    } else if (item.sellIn <= 10) {
      item.quality += 2;
    } else {
      item.quality += this.DEFAULT_QUALITY_CHANGE;
    }
  }

  private updateConjured(item: Item) {
    if (item.quality > 0) {
      item.quality -= item.sellIn > 0 ? (2 * this.DEFAULT_QUALITY_CHANGE) : (2 * this.EXPIRED_QUALITY_CHANGE);
    }
  }

  private updateNormalItem(item: Item) {
    if (item.quality > 0) {
      item.quality -= item.sellIn > 0 ? this.DEFAULT_QUALITY_CHANGE : this.EXPIRED_QUALITY_CHANGE;
    }
  }

  private updateSellIn(item: Item) {
    if (item.name !== ItemType.Sulfuras) {
      item.sellIn -= 1;
    }
  }

  private validateQualityBounds(item: Item) {
    // Ensure quality is within bounds
    item.quality = Math.max(0, Math.min(item.name === ItemType.Sulfuras ? this.MAX_QUALITY.SULFURAS : this.MAX_QUALITY.DEFAULT, item.quality));
  }
}
