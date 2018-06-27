import scrapy


class MovieItem(scrapy.Item):
    name = scrapy.Field()
    summary = scrapy.Field()
    directors = scrapy.Field()
    writers = scrapy.Field()
