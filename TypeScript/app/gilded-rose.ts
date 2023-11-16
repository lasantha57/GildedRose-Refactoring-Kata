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
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      // if (item.name != ItemType.AgedBrie && item.name != ItemType.BackstagePasses) {
      //   if (item.quality > 0) {
      //     if (item.name != ItemType.Sulfuras) {
      //       item.quality = item.quality - 1
      //     }
      //   }
      // } else {
      //   if (item.quality < 50) {
      //     item.quality = item.quality + 1
      //     if (item.name == ItemType.BackstagePasses) {
      //       if (item.sellIn < 11) {
      //         if (item.quality < 50) {
      //           item.quality = item.quality + 1
      //         }
      //       }
      //       if (item.sellIn < 6) {
      //         if (item.quality < 50) {
      //           item.quality = item.quality + 1
      //         }
      //       }
      //     }
      //   }
      // }
      // if (item.name != ItemType.Sulfuras) {
      //   item.sellIn = item.sellIn - 1;
      // }
      // if (item.sellIn < 0) {
      //   if (item.name != ItemType.AgedBrie) {
      //     if (item.name != ItemType.BackstagePasses) {
      //       if (item.quality > 0) {
      //         if (item.name != ItemType.Sulfuras) {
      //           item.quality = item.quality - 1
      //         }
      //       }
      //     } else {
      //       item.quality = item.quality - item.quality
      //     }
      //   } else {
      //     if (item.quality < 50) {
      //       item.quality = item.quality + 1
      //     }
      //   }
      // }

      switch (item.name) {
        case ItemType.AgedBrie:
          this.updateAgedBrie(item);
          break;
        case ItemType.Sulfuras:
          break
        case ItemType.BackstagePasses:
          this.updateBackStagePasses(item);
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
