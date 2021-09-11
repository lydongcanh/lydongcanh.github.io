---
date: 2021-08-29T20:25:40+07:00
layout: post
title: Comparing Redis and Memcached
subtitle: Select the in-memory data store that meets your needs.
description: Select the in-memory data store that meets your needs.
image: https://res.cloudinary.com/lydongcanh-github-io/image/upload/v1630242877/redis-memcached-comparison-banner_rmbvep.jpg
optimized_image: https://res.cloudinary.com/lydongcanh-github-io/image/upload/c_scale,w_380/v1630241388/redis-memcached-comparison-banner_rmbvep.jpg
category: dev
tags:
  - redis
  - memcached
  - cache
author: lydongcanh
---

## Choosing between Redis and Memcached
Redis and Memcached are popular, open-source, in-memory data stores. Although they are both easy to use and offer high performance, there are important differences to consider when choosing an engine. 
Memcached is designed for simplicity while Redis offers a rich set of features that make it effective for a wide range of use cases. Understand your requirements and what each engine offers to decide which solution better meets your needs.

|                                                                                                       | Memcached | Redis |
|-------------------------------------------------------------------------------------------------------|-----------|-------|
| [Sub-millisecond latency](#sub-millisecond-latency)                                                   | Yes       | Yes   |
| [Developer ease of use](#developer-ease-of-use)                                                       | Yes       | Yes   |
| [Data partitioning](#data-partitioning)                                                               | Yes       | Yes   |
| [Support for a broad set of programming languages](#support-for-a-broad-set-of-programming-languages) | Yes       | Yes   |
| [Advanced data structures](#advanced-data-structures)                                                 | -         | Yes   |
| [Multithreaded architecture](#multithreaded-architecture)                                             | Yes       | -     |
| [Snapshots](#snapshots)                                                                               | -         | Yes   |
| [Replication](#replication)                                                                           | -         | Yes   |
| [Transactions](#transactions)                                                                         | -         | Yes   |
| [Pub/Sub](#pubsub)                                                                                    | -         | Yes   |
| [Lua scripting](#lua-scripting)                                                                       | -         | Yes   |
| [Geospatial support](#geospatial-support)                                                             | -         | Yes   |

### Sub-millisecond latency
Both Redis and Memcached support sub-millisecond response times. By storing data in-memory they can read data more quickly than disk based databases.

### Developer ease of use
Both Redis and Memcached are syntactically easy to use and require a minimal amount of code to integrate into your application.

### Data partitioning
Both Redis and Memcached allow you to distribute your data among multiple nodes. This allows you to scale out to better handle more data when demand grows.

### Support for a broad set of programming languages
Both Redis and Memcached have many open-source clients available for developers. Supported languages include Java, Python, PHP, C, C++, C#, JavaScript, Node.js, Ruby, Go and many others.

### Advanced data structures
In addition to strings, Redis supports lists, sets, sorted sets, hashes, bit arrays, and hyperloglogs. Applications can use these more advanced data structures to support a variety of use cases. For example, you can use Redis Sorted Sets to easily implement a game leaderboard that keeps a list of players sorted by their rank.

### Multithreaded architecture
Since Memcached is multithreaded, it can make use of multiple processing cores. This means that you can handle more operations by scaling up compute capacity.

### Snapshots
With Redis you can keep your data on disk with a point in time snapshot which can be used for archiving or recovery.

### Replication
Redis lets you create multiple replicas of a Redis primary. This allows you to scale database reads and to have highly available clusters.

### Transactions
Redis supports transactions which let you execute a group of commands as an isolated and atomic operation.

### Pub/Sub
Redis supports Pub/Sub messaging with pattern matching which you can use for high performance chat rooms, real-time comment streams, social media feeds, and server intercommunication.

### Lua scripting
Redis allows you to execute transactional Lua scripts. Scripts can help you boost performance and simplify your application.

### Geospatial support
Redis has purpose-built commands for working with real-time geospatial data at scale. You can perform operations like finding the distance between two elements (for example people or places) and finding all elements within a given distance of a point.