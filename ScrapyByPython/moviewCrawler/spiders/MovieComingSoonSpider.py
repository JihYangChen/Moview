import scrapy
import json
import collections
import time

class MovieComingSoonSpider(scrapy.Spider):
    name = "MovieComingSoonSpider"
    movieComingSoonInfoList = []
    
    def start_requests(self):
        urlForMoviesComingSoon = "https://www.imdb.com/movies-coming-soon/?ref_=nv_mv_cs_4"
        yield scrapy.Request(url=urlForMoviesComingSoon, callback=self.parseForMoviesComingSoon)


    def parseForMoviesComingSoon(self, response):
        movieComingSoonURLs = []
        for entry in response.xpath('//td[@class="overview-top"]/h4/a/@href').extract():
            yield scrapy.Request(url= "https://www.imdb.com" + entry, callback=self.parseInfoForMovieComingSoon)
             


    def parseInfoForMovieComingSoon(self, response):
        movieInfo = collections.OrderedDict() 
        movieInfo['name'] = ""
        movieInfo['coverUrl'] = ""
        movieInfo['posterUrl'] = ""
        movieInfo['casts'] = []
        movieInfo['directors'] = []
        movieInfo['categories'] = []
        movieInfo['gallery'] = []
        movieInfo['trailers'] = []
        movieInfo['storyline'] = ""
        movieInfo['runtime'] = ""
        movieInfo['releaseDate'] = ""
        movieInfo['ComingSoon'] = "true"
        movieId = 0

        for entry in response.xpath('//meta[@property="pageId"]/@content').extract() :
            movieId = entry

        for entry in response.css('h1[itemprop="name"]::text').extract():
            if entry.rstrip() != '':
                movieInfo["name"] = entry.rstrip()
        for entry in response.css('td[itemprop="actor"]').css('a').css('.itemprop::text').extract() :
            movieInfo["casts"].append(entry)
        for entry in response.css('span[itemprop="director"]').css('a').css('.itemprop::text').extract() :
            movieInfo["directors"].append(entry)
        for entry in response.css('span[itemprop="genre"]::text').extract() :
            movieInfo["categories"].append(entry)
        for entry in response.css('span[itemprop="description"]::text').extract() :
            movieInfo["storyline"] = entry.lstrip()
        for entry in response.css('time[itemprop="duration"]::text').extract() :
            movieInfo["runtime"] = entry.rstrip(" min")

        yield scrapy.Request(url= "https://www.imdb.com/title/" + movieId + "/mediaindex?ref_=tt_mv_close", meta={'movieInfo': movieInfo}, callback=self.parseGalleryURL)   
        yield scrapy.Request(url= "https://www.imdb.com/title/" + movieId + "/videogallery?ref_=tt_pv_vi_sm", meta={'movieInfo': movieInfo}, callback=self.parseTrailerURLs)
        
        
    def parseGalleryURL(self, response):
        movieInfo = response.meta['movieInfo']
        imageURLs = response.xpath('//div[@class="media_index_thumb_list"]/a/@href').extract()
        coverImageURL = response.xpath('//div[@class="subpage_title_block"]/a/img/@src').extract_first()

        for x in range(11, 99):
            coverImageURL = coverImageURL.replace('UX' + str(x), 'UX500')
        coverImageURL = coverImageURL.replace('_CR0,0,67,98_AL_', '')

        movieInfo['coverUrl'] = coverImageURL
        for imageURL in imageURLs:
            yield scrapy.Request(url= "https://www.imdb.com" + imageURL, meta={'movieInfo': movieInfo , 'imageCount': len(imageURLs)}, callback=self.parseImageURL)


    def parseImageURL(self, response):
        movieInfo = response.meta['movieInfo']
        imageCount = response.meta['imageCount']
        imageURL = response.xpath('//meta[@itemprop="image"]/@content').extract_first()
        SXPoint = 0
        SYPoint = 0
        imageWidth = 0
        imageHeight = 0

        if 'SX' in imageURL:
            SXPoint = imageURL.index('SX')
            if imageURL[SXPoint + 2 : SXPoint + 5].isdigit():
                imageWidth = imageURL[SXPoint + 2 : SXPoint + 5]
            elif imageURL[SXPoint + 2 : SXPoint + 4].isdigit():
                imageWidth = imageURL[SXPoint + 2 : SXPoint + 4]
            elif imageURL[SXPoint + 2 : SXPoint + 3].isdigit():
                imageWidth = imageURL[SXPoint + 2 : SXPoint + 3]

        if 'SY' in imageURL:
            SYPoint = imageURL.index('SY')
            if imageURL[SYPoint + 2 : SYPoint + 5].isdigit():
                imageHeight = imageURL[SYPoint + 2 : SYPoint + 5]
            elif imageURL[SYPoint + 2 : SYPoint + 4].isdigit():
                imageHeight = imageURL[SYPoint + 2 : SYPoint + 4]
            elif imageURL[SXPoint + 2 : SXPoint + 3].isdigit():
                imageHeight = imageURL[SYPoint + 2 : SYPoint + 3]

        if '_CR' in imageURL and '_AL_' in imageURL:
            imageURL = imageURL.replace(imageURL[imageURL.index('_CR') : imageURL.index('_AL_') + 3], '') 
        
        if imageCount < 6 or imageWidth > imageHeight and imageURL != "":
            movieInfo['gallery'].append(imageURL)

            

    def parseTrailerURLs(self, response):
        movieInfo = response.meta['movieInfo']
        trailerURLs = response.xpath('//*[@class="search-results"]/ol/li/div/a/@href').extract()
        for trailerURL in trailerURLs:
            yield scrapy.Request(url= "https://www.imdb.com" + trailerURL, meta={'movieInfo': movieInfo , 'trailerCount': len(trailerURLs)}, callback=self.parseTrailerURL)


    def parseTrailerURL(self, response):
        movieInfo = response.meta['movieInfo']
        trailerCount = response.meta['trailerCount']
        trailerid = response.xpath('//meta[@property="pageId"]/@content').extract_first()
        trailer = 'https://www.imdb.com/videoembed/' + trailerid
        movieInfo['trailers'].append(trailer)

        if len(movieInfo['trailers']) == trailerCount:
            if not movieInfo in self.movieComingSoonInfoList:
                self.movieComingSoonInfoList.append(movieInfo)
        

    def closed(self, reason):
        with open('MovieInfosComingSoon.json', 'w+') as f:
            f.write(json.dumps(self.movieComingSoonInfoList, indent=4, separators=(',', ':')))






