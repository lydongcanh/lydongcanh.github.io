---
date: 2021-08-28T19:36:40+07:00
layout: post
title: Introduction to Redis
subtitle: Fast, open source in-memory data store for use as a database, cache, message broker, and queue.
description: Fast, open source in-memory data store for use as a database, cache, message broker, and queue.
image: https://res.cloudinary.com/lydongcanh-github-io/image/upload/v1630241388/redis-101-banner_yd9o0m.png
optimized_image: https://res.cloudinary.com/lydongcanh-github-io/image/upload/c_scale,w_380/v1630241388/redis-101-banner_yd9o0m.png
category: dev
tags:
  - redis
  - cache
  - database
  - message-broker
  - queue
author: lydongcanh
---

## What is Redis?
Redis, which stands for Remote Dictionary Server, is a fast, open source, in-memory, key-value data store. The project started when Salvatore Sanfilippo, the original developer of Redis, wanted to improve the scalability of his Italian startup. From there, he developed Redis, which is now used as a database, cache, message broker, and queue.

Redis delivers sub-millisecond response times, enabling millions of requests per second for real-time applications in industries like gaming, ad-tech, financial services, healthcare, and IoT. Today, Redis is one of the most popular open source engines today, named the "Most Loved" database by Stack Overflow for five consecutive years. Because of its fast performance, Redis is a popular choice for caching, session management, gaming, leaderboards, real-time analytics, geospatial, ride-hailing, chat/messaging, media streaming, and pub/sub apps.

## Benefits of Redis

### Performance
All Redis data resides in memory, which enables low latency and high throughput data access. Unlike traditional databases, In-memory data stores don’t require a trip to disk, reducing engine latency to microseconds. Because of this, in-memory data stores can support an order of magnitude more operations and faster response times. The result is blazing-fast performance with average read and write operations taking less than a millisecond and support for millions of operations per second.

### Flexible data structures
Unlike other key-value data stores that offer limited data structures, Redis has a vast variety of data structures to meet your application needs. Redis data types include:
* Strings – text or binary data up to 512MB in size
* Lists – a collection of Strings in the order they were added
* Sets – an unordered collection of strings with the ability to intersect, union, and diff other Set types
* Sorted Sets – Sets ordered by a value
* Hashes – a data structure for storing a list of fields and values
* Bitmaps – a data type that offers bit level operations
* HyperLogLogs – a probabilistic data structure to estimate the unique items in a data set
* Streams - a log data structure Message queue
* Geospatial - a longitude-/latitude-based entries Maps, "nearby"
  
### Simplicity and ease-of-use
Redis enables you to write traditionally complex code with fewer, simpler lines. With Redis, you write fewer lines of code to store, access, and use data in your applications. The difference is that developers who use Redis can use a simple command structure as opposed to the query languages of traditional databases. For example, you can use the Redis hash data structure to move data to a data store with only one line of code. A similar task on a data store with no hash data structures would require many lines of code to convert from one format to another. Redis comes with native data structures and many options to manipulate and interact with your data. Over a hundred open source clients are available for Redis developers. Supported languages include Java, Python, PHP, C, C++, C#, JavaScript, Node.js, Ruby, R, Go, and many others.

### Replication and persistence
Redis employs a primary-replica architecture and supports asynchronous replication where data can be replicated to multiple replica servers. This provides improved read performance (as requests can be split among the servers) and faster recovery when the primary server experiences an outage. For persistence, Redis supports point-in-time backups (copying the Redis data set to disk).
Redis was not built to be a durable and consistent database. If you need a durable, Redis-compatible database, consider [Amazon MemoryDB for Redis](https://aws.amazon.com/memorydb/). Because MemoryDB uses a durable transactional log that stores data across multiple Availability Zones (AZs), you can use it as your primary database. MemoryDB is purpose-built to enable developers to use the Redis API without worrying about managing a separate cache, database, or the underlying infrastructure.

### High availability and scalability
Redis offers a primary-replica architecture in a single node primary or a clustered topology. This allows you to build highly available solutions providing consistent performance and reliability. When you need to adjust your cluster size, various options to scale up and scale in or out are also available. This allows your cluster to grow with your demands.

### Open Source
Redis is an open source project supported by a vibrant community. There’s no vendor or technology lock in as Redis is open standards based, supports open data formats, and features a rich set of clients.

## Popular Redis Use Cases

### Caching
Redis is a great choice for implementing a highly available in-memory cache to decrease data access latency, increase throughput, and ease the load off your relational or NoSQL database and application. Redis can serve frequently requested items at sub-millisecond response times, and enables you to easily scale for higher loads without growing the costlier backend. Database query results caching, persistent session caching, web page caching, and caching of frequently used objects such as images, files, and metadata are all popular examples of caching with Redis.

### Chat, messaging, and queues
Redis supports Pub/Sub with pattern matching and a variety of data structures such as lists, sorted sets, and hashes. This allows Redis to support high performance chat rooms, real-time comment streams, social media feeds and server intercommunication. The Redis List data structure makes it easy to implement a lightweight queue. Lists offer atomic operations as well as blocking capabilities, making them suitable for a variety of applications that require a reliable message broker or a circular list.

### Gaming leaderboards
Redis is a popular choice among game developers looking to build real-time leaderboards. Simply use the Redis Sorted Set data structure, which provides uniqueness of elements while maintaining the list sorted by users' scores. Creating a real-time ranked list is as easy as updating a user's score each time it changes. You can also use Sorted Sets to handle time series data by using timestamps as the score.

### Session store
Redis as an in-memory data store with high availability and persistence is a popular choice among application developers to store and manage session data for internet-scale applications. Redis provides the sub-millisecond latency, scale, and resiliency required to manage session data such as user profiles, credentials, session state, and user-specific personalization.

### Rich media streaming
Redis offers a fast, in-memory data store to power live streaming use cases. Redis can be used to store metadata about users' profiles and viewing histories, authentication information/tokens for millions of users, and manifest files to enable CDNs to stream videos to millions of mobile and desktop users at a time.

### Geospatial
Redis offers purpose-built in-memory data structures and operators to manage real-time geospatial data at scale and speed. Commands such as GEOADD, GEODIST, GEORADIUS, and GEORADIUSBYMEMBER to store, process, and analyze geospatial data in real-time make geospatial easy and fast with Redis. You can use Redis to add location-based features such as drive time, drive distance, and points of interest to your applications.

### Machine Learning
Modern data-driven applications require machine learning to quickly process a massive volume, variety, and velocity of data and automate decision making. For use cases like fraud detection in gaming and financial services, real-time bidding in ad-tech, and matchmaking in dating and ride sharing, the ability to process live data and make decisions within tens of milliseconds is of utmost importance. Redis gives you a fast in-memory data store to build, train, and deploy machine learning models quickly.

### Real-time analytics
Redis can be used with streaming solutions such as Apache Kafka and Amazon Kinesis as an in-memory data store to ingest, process, and analyze real-time data with sub-millisecond latency. Redis is an ideal choice for real-time analytics use cases such as social media analytics, ad targeting, personalization, and IoT.

## Redis vs. Memcached
Both Redis and Memcached are in-memory, open-source data stores. Memcached, a high-performance distributed memory cache service, is designed for simplicity while Redis offers a rich set of features that make it effective for a wide range of use cases. For more detailed feature comparison to help you make a decision, view [Redis vs Memcached](/redis-memcached-comparison). They work with relational or key-value databases to improve performance, such as MySQL, PostgreSQL, Aurora, Oracle, SQL Server, DynamoDB, and more.







