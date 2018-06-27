import scrapy
import json
from moviewCrawler.items.MovieNameSetItem import MovieNameSetItem

class MovieNameSpider(scrapy.Spider):
    name = "MovieNameSpider"
    custom_settings = {
        'ITEM_PIPELINES': {
            'moviewCrawler.pipelines.MovieNamePipeline.MovieNamePipeline': 300,
        }
    }
    movieNameSet = set()

    def start_requests(self):
        urls = []
        postalCodes = []

        filename = 'NYC-postalCode.json'
        with open(filename, 'r') as f:
            postalCodes = json.loads(f.read())

        for postalCode in postalCodes:
            urls.append('https://www.imdb.com/showtimes/location/US/' + postalCode)
        
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        
        for entry in response.css('.lister-item.mode-grid'):
            self.movieNameSet.add(entry.css('.title')[0].css('a::text').extract_first())
        
        movieNameSetItem = MovieNameSetItem()
        movieNameSetItem['movieNameSet'] = self.movieNameSet

        return movieNameSetItem
