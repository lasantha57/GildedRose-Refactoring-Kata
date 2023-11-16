import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {

  it('should decrease quality and sellIn for normal item', () => {
    const gildedRose = new GildedRose([new Item('Normal Item', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Normal Item');
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(9);
  });

  it('should decrease quality and sellIn twice as fast after sell by date for normal item', () => {
    const gildedRose = new GildedRose([new Item('Normal Item', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Normal Item');
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(8);
  });

  it('should not decrease quality below 0 for normal item', () => {
    const gildedRose = new GildedRose([new Item('Normal Item', 5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Normal Item');
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(0);
  });

  it('should increase quality for Aged Brie', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Aged Brie');
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(11);
  });

  it('should not increase quality above 50 for Aged Brie', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Aged Brie');
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(50);
  });

  it('should increase quality for Backstage Passes', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toBe(14);
    expect(items[0].quality).toBe(11);
  });

  it('should increase quality by 2 for Backstage Passes when there are 10 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(12);
  });

  it('should increase quality by 3 for Backstage Passes when there are 5 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(13);
  });

  it('should drop quality to 0 for Backstage Passes after the concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it('should not decrease quality for Sulfuras', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Sulfuras, Hand of Ragnaros');
    expect(items[0].sellIn).toBe(5);
    expect(items[0].quality).toBe(80);
  });

  it('should decrease quality twise as fast for Conjured item', () => {
    const gildedRose = new GildedRose([new Item('Conjured', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Conjured');
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(8);
  });

  it('should decrease quality below 0 for Conjured item', () => {
    const gildedRose = new GildedRose([new Item('Conjured', 5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Conjured');
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(0);
  });
});
