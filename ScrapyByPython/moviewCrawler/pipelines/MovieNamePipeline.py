import json

class MovieNamePipeline(object):
    movieNameSet = set()

    def open_spider(self, spider):
        pass
        
    def process_item(self, item, spider):
        self.movieNameSet = self.movieNameSet.union(item['movieNameSet'])
        return item

    def close_spider(self, spider):
        print("MovieNamePipeline Spider is close!")