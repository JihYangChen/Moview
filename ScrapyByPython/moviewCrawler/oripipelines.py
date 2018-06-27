# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html


class TutorialPipeline(object):
    def open_spider(self, spider):
        print("Spider is open!")

    def process_item(self, item, spider):
        print("pipeline is in!")
        return item

    def close_spider(self, spider):
        print("Spider is close!")
