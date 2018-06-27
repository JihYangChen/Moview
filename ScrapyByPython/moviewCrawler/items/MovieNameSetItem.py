import scrapy

class MovieNameSetItem(scrapy.Item):
    movieNameSet = scrapy.Field()

    def __repr__(self):
        return ""
