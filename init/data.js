const sampleListings = [
  {
    "title": "Cozy Beachfront Cottage",
    "description": "Escape to this charming coastal cottage right along Malibu's scenic shoreline. Enjoy stunning Pacific Ocean views, ocean breezes, and direct private steps down to the sandy beach.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2450,
    "location": "Malibu",
    "country": "United States",
    "category": "Beachfront",
    "isGuestFavourite": true,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -118.68561,
        34.03688
      ]
    }
  },
  {
    "title": "Modern Loft in Downtown",
    "description": "Stay in the heart of Manhattan in this stylish industrial-chic loft apartment. Features soaring ceilings, exposed brick walls, designer furnishings, and fast access to Broadway and SoHo.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=60"
    },
    "price": 1850,
    "location": "New York City",
    "country": "United States",
    "category": "City Stays",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -74.005994,
        40.712749
      ]
    }
  },
  {
    "title": "Mountain Retreat",
    "description": "Unplug and recharge in this peaceful handcrafted cedar cabin nestled in Aspen's towering pine forest. Enjoy a wood-burning fireplace, wraparound deck, and stunning Rocky Mountain trails.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2800,
    "location": "Aspen",
    "country": "United States",
    "category": "Mountains",
    "isGuestFavourite": true,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -106.819217,
        39.190681
      ]
    }
  },
  {
    "title": "Historic Villa in Tuscany",
    "description": "Experience timeless Italian elegance in this restored 16th-century stone villa near Florence. Wander through ancient olive groves, private vineyards, and private cypress-lined gardens.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60"
    },
    "price": 3850,
    "location": "Florence",
    "country": "Italy",
    "category": "Villas",
    "isGuestFavourite": true,
    "geometry": {
      "type": "Point",
      "coordinates": [
        11.256129,
        43.771484
      ]
    }
  },
  {
    "title": "Secluded Treehouse Getaway",
    "description": "Live among the lush emerald canopy in this handcrafted timber treehouse nestled in the evergreen forests outside Portland. A serene sanctuary featuring cedar hot tubs and birdwatching decks.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60"
    },
    "price": 1450,
    "location": "Portland",
    "country": "United States",
    "category": "Forest Retreats",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -122.678367,
        45.515197
      ]
    }
  },
  {
    "title": "Beachfront Paradise",
    "description": "Step directly out from your private patio onto white powdery Caribbean sands. This beachfront luxury villa offers panoramic turquoise sea views, infinity plunge pool, and tropical cabanas.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60"
    },
    "price": 3500,
    "location": "Cancun",
    "country": "Mexico",
    "category": "Beachfront",
    "isGuestFavourite": true,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -86.85176,
        21.16188
      ]
    }
  },
  {
    "title": "Rustic Cabin by the Lake",
    "description": "Spend tranquil days fishing, kayaking, and paddleboarding on crystal-clear Lake Tahoe. This cozy lakeside log cabin features a private boat dock, stone hearth, and alpine pine vistas.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60"
    },
    "price": 1650,
    "location": "Lake Tahoe",
    "country": "United States",
    "category": "Lakefront",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -119.9844,
        38.9338
      ]
    }
  },
  {
    "title": "Luxury Penthouse with City Views",
    "description": "Indulge in modern luxury high above downtown Los Angeles. This breathtaking penthouse boasts floor-to-ceiling glass walls, sleek designer interiors, and sunset views over the Hollywood Hills.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60"
    },
    "price": 5800,
    "location": "Los Angeles",
    "country": "United States",
    "category": "City Stays",
    "isGuestFavourite": true,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -118.254187,
        34.048051
      ]
    }
  },
  {
    "title": "Ski-In/Ski-Out Chalet",
    "description": "Glide straight onto world-class slopes from the doorway of this luxury wooden chalet in Verbier. Features a crackling fireplace, cedar sauna, and panoramic views of the snowy Swiss Alps.",
    "image": {
      "filename": "listingimage",
      "url": "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?auto=format&fit=crop&w=800&q=60"
    },
    "price": 4800,
    "location": "Verbier",
    "country": "Switzerland",
    "category": "Mountains",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        7.229043,
        46.096066
      ]
    }
  },
  {
    "title": "Safari Lodge in the Serengeti",
    "description": "Experience the thrill of the African savannah in this luxury safari tented lodge overlooking wildlife migratory corridors, acacia plains, and spectacular Serengeti sunsets.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=60"
    },
    "price": 5500,
    "location": "Serengeti National Park",
    "country": "Tanzania",
    "category": "Camping",
    "isGuestFavourite": true,
    "geometry": {
      "type": "Point",
      "coordinates": [
        77.23848,
        28.563276
      ]
    }
  },
  {
    "title": "Historic Canal House",
    "description": "Step into 17th-century Dutch architectural elegance in this canal house along Amsterdam's prestigious Herengracht. Features high beam ceilings, large mullioned windows, and picturesque canal views.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2650,
    "location": "Amsterdam",
    "country": "Netherlands",
    "category": "Heritage",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        4.9,
        52.378
      ]
    }
  },
  {
    "title": "Private Island Retreat",
    "description": "Enjoy an entire secluded tropical island to yourself in Fiji's Mamanuca archipelago. Surrounded by vibrant coral reefs, coconut groves, and calm turquoise waters for total privacy.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=60"
    },
    "price": 8500,
    "location": "Mamanuca Islands",
    "country": "Fiji",
    "category": "Beachfront",
    "isGuestFavourite": true,
    "geometry": {
      "type": "Point",
      "coordinates": [
        178.4406,
        -18.1456
      ]
    }
  },
  {
    "title": "Charming Cottage in the Cotswolds",
    "description": "Escape to the picturesque English countryside in this honey-stone cottage with a thatched roof, blooming cottage rose garden, and wood-burning stove in the charming Cotswolds.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=60"
    },
    "price": 1850,
    "location": "Cotswolds",
    "country": "United Kingdom",
    "category": "Countryside",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -2.033333,
        51.8
      ]
    }
  },
  {
    "title": "Historic Brownstone in Boston",
    "description": "Step into historic New England elegance in this authentic Victorian brownstone on Beacon Hill. Features gas-lit streetfronts, ornate fireplaces, crown moldings, and private brick courtyard.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1501979376754-2ff867a4f659?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2950,
    "location": "Boston",
    "country": "United States",
    "category": "Heritage",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -71.056804,
        42.35888
      ]
    }
  },
  {
    "title": "Beachfront Bungalow in Bali",
    "description": "Relax on the sun-soaked shores of Seminyak in this open-concept tropical bamboo villa featuring a private plunge pool, outdoor rain shower, and lush frangipani garden.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=60"
    },
    "price": 3200,
    "location": "Seminyak",
    "country": "Indonesia",
    "category": "Beachfront",
    "isGuestFavourite": true,
    "geometry": {
      "type": "Point",
      "coordinates": [
        115.16778,
        -8.691034
      ]
    }
  },
  {
    "title": "Mountain View Cabin in Banff",
    "description": "Take in awe-inspiring views of the Canadian Rockies from this cozy handcrafted log cabin situated near Lake Louise. Features cedar interiors, a heated deck, and alpine scenery.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2400,
    "location": "Banff",
    "country": "Canada",
    "category": "Mountains",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -115.57096,
        51.176613
      ]
    }
  },
  {
    "title": "Art Deco Apartment in Miami",
    "description": "Immerse yourself in pastel glamour in this stylish Art Deco apartment in South Beach. Just one block from Ocean Drive, offering palm tree views, sunny balconies, and beach cruiser bikes.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2200,
    "location": "Miami",
    "country": "United States",
    "category": "Apartments",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -80.1919,
        25.773357
      ]
    }
  },
  {
    "title": "Tropical Villa in Phuket",
    "description": "Perched high on the cliffs of Kamala, this luxury Thai villa features a spectacular 20-meter infinity pool overlooking turquoise Andaman waters and lush jungle hillsides.",
    "image": {
      "filename": "AthithiBandhu_DEV/p8xhkbhumwimwlui4zof",
      "url": "https://res.cloudinary.com/a8mpmnlo/image/upload/v1791997761/AthithiBandhu_DEV/p8xhkbhumwimwlui4zof.jpg"
    },
    "price": 4500,
    "location": "Phuket",
    "country": "Thailand",
    "category": "Pools",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        98.38732,
        7.88346
      ]
    }
  },
  {
    "title": "Historic Castle in Scotland",
    "description": "Live like Scottish royalty in this authentic 16th-century stone castle near Inverness in the Scottish Highlands. Features grand baronial fireplaces, spiral staircases, and mist-shrouded loch vistas.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=60"
    },
    "price": 5200,
    "location": "Inverness",
    "country": "United Kingdom",
    "category": "Palaces",
    "isGuestFavourite": true,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -4.225739,
        57.479012
      ]
    }
  },
  {
    "title": "Desert Oasis in Dubai",
    "description": "Indulge in Arabian opulence in this desert sanctuary surrounded by the rolling dunes of Dubai. Features a private temperature-controlled pool, Bedouin majlis lounge, and starlit desert dining.",
    "image": {
      "filename": "AthithiBandhu_DEV/f864ereqqpswykulrnsg",
      "url": "https://res.cloudinary.com/a8mpmnlo/image/upload/v1791997854/AthithiBandhu_DEV/f864ereqqpswykulrnsg.jpg"
    },
    "price": 7500,
    "location": "Dubai",
    "country": "United Arab Emirates",
    "category": "Desert Stays",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        55.297558,
        25.25809
      ]
    }
  },
  {
    "title": "Rustic Log Cabin in Montana",
    "description": "Unplug and recharge in this handcrafted pine log cabin situated in Montana's Gallatin Valley near Bozeman. Surrounded by towering Douglas firs, winding mountain streams, and big sky views.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?auto=format&fit=crop&w=800&q=60"
    },
    "price": 1750,
    "location": "Bozeman",
    "country": "United States",
    "category": "Forest Retreats",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -111.035732,
        45.679303
      ]
    }
  },
  {
    "title": "Beachfront Villa in Greece",
    "description": "Enjoy the Aegean breeze in this whitewashed Cycladic villa perched on the cliffs of Mykonos. Features classic blue shutters, infinity sea terrace, and private pathways down to quiet coves.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=800&q=60"
    },
    "price": 3600,
    "location": "Mykonos",
    "country": "Greece",
    "category": "Villas",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        25.326384,
        37.446503
      ]
    }
  },
  {
    "title": "Eco-Friendly Treehouse Retreat",
    "description": "Rest suspended high within the cloud forest canopy of Monteverde. Built sustainably with local teak and bamboo, offering open-air jungle balconies visited by hummingbirds and toucans.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=60"
    },
    "price": 1400,
    "location": "Monteverde",
    "country": "Costa Rica",
    "category": "Forest Retreats",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -84.82451,
        10.317069
      ]
    }
  },
  {
    "title": "Historic Cottage in Charleston",
    "description": "Experience historic Southern charm in this restored 18th-century carriage cottage in Charleston's historic French Quarter, featuring a private jasmine-lined brick patio and piazza.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2100,
    "location": "Charleston",
    "country": "United States",
    "category": "Heritage",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -79.938628,
        32.789284
      ]
    }
  },
  {
    "title": "Modern Apartment in Tokyo",
    "description": "Explore Tokyo from this sleek, minimalist designer apartment located in vibrant Shinjuku. Features panoramic high-floor skyline views, Japanese soaking tub, and cutting-edge amenities.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=60"
    },
    "price": 3200,
    "location": "Shinjuku",
    "country": "Japan",
    "category": "City Stays",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        139.57367,
        35.290627
      ]
    }
  },
  {
    "title": "Lakefront Cabin in New Hampshire",
    "description": "Spend peaceful summer days swimming and kayaking on Lake Winnipesaukee from this private wooden cabin. Features a private dock, screened porch, stone fireplace, and pristine mountain waters.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=800&q=60"
    },
    "price": 1800,
    "location": "Lake Winnipesaukee",
    "country": "United States",
    "category": "Lakefront",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -71.138176,
        43.545713
      ]
    }
  },
  {
    "title": "Luxury Villa in the Maldives",
    "description": "Indulge in pure oceanfront luxury in this thatched overwater stilt villa in Baa Atoll. Features glass-bottom living rooms, private infinity plunge pool, and direct ladder into the crystal coral lagoon.",
    "image": {
      "filename": "AthithiBandhu_DEV/v0gdz9oglf1dr1gnqsza",
      "url": "https://res.cloudinary.com/a8mpmnlo/image/upload/v1791998137/AthithiBandhu_DEV/v0gdz9oglf1dr1gnqsza.jpg"
    },
    "price": 8500,
    "location": "Baa Atoll",
    "country": "Maldives",
    "category": "Beachfront",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        73.070365,
        5.103336
      ]
    }
  },
  {
    "title": "Ski Chalet in Aspen",
    "description": "Hit the powdery slopes in comfort from this luxury timber ski chalet in Aspen, Colorado. Features private outdoor hot tub with mountain views, heated ski storage, and floor-to-ceiling hearth.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=800&q=60"
    },
    "price": 6200,
    "location": "Aspen",
    "country": "United States",
    "category": "Top of the World",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -106.819217,
        39.190681
      ]
    }
  },
  {
    "title": "Secluded Beach House in Costa Rica",
    "description": "Escape to this tranquil open-air teak beach house nestled along Santa Teresa's pristine Pacific surf coast. Steps from world-class waves, lush palm trees, and breathtaking ocean sunsets.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2400,
    "location": "Santa Teresa",
    "country": "Costa Rica",
    "category": "Beachfront",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -70.670536,
        -33.441115
      ]
    }
  },
  {
    "title": "Luxury Apartment in Paris",
    "description": "Stay in an elegant Haussmannian apartment located in Paris's 7th arrondissement. Features ornate wall moldings, Juliet balconies overlooking Eiffel Tower vistas, and marble fireplaces.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=60"
    },
    "price": 3900,
    "location": "Paris",
    "country": "France",
    "category": "City Stays",
    "isGuestFavourite": true,
    "geometry": {
      "type": "Point",
      "coordinates": [
        2.348392,
        48.853495
      ]
    }
  },
  {
    "title": "Mountain Lodge in Zermatt",
    "description": "Relax in a cozy Alpine wooden lodge in Zermatt offering unobstructed views of the iconic Matterhorn. Features pine-scented bedrooms, fondue dining area, and easy access to glacier skiing.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60"
    },
    "price": 5100,
    "location": "Zermatt",
    "country": "Switzerland",
    "category": "Mountains",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        7.749103,
        46.020683
      ]
    }
  },
  {
    "title": "Beach Villa in Santorini",
    "description": "Enjoy world-renowned Aegean sunsets from this cave villa carved directly into the caldera cliffs of Oia, Santorini. Features white stone arches, private sun deck, and cliffside plunge pool.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=60"
    },
    "price": 5800,
    "location": "Oia",
    "country": "Greece",
    "category": "Villas",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        25.376408,
        36.46185
      ]
    }
  },
  {
    "title": "Modern Studio in Singapore",
    "description": "Experience cosmopolitan living in this modern studio apartment situated in Singapore's Marina Bay district. Offers sweeping skyline views, rooftop pool access, and proximity to botanical gardens.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=60"
    },
    "price": 3400,
    "location": "Marina Bay",
    "country": "Singapore",
    "category": "City Stays",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        103.853869,
        1.277116
      ]
    }
  },
  {
    "title": "Forest Cabin in Norway",
    "description": "Escape into the serene Scandinavian wilderness in this modern dark-timber cabin near Bergen. Surrounded by pine forests, fjord trails, and mountain peaks for hiking and aurora watching.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2600,
    "location": "Bergen",
    "country": "Norway",
    "category": "Forest Retreats",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        5.325952,
        60.39555
      ]
    }
  },
  {
    "title": "Countryside Cottage in Ireland",
    "description": "Immerse yourself in authentic Irish countryside charm in this stone cottage near Killarney. Features rolling green pasture views, peat fireplace, and close proximity to the Ring of Kerry.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2100,
    "location": "Killarney",
    "country": "Ireland",
    "category": "Countryside",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -9.509054,
        52.058426
      ]
    }
  },
  {
    "title": "Riverside Apartment in Prague",
    "description": "Take in stunning historic vistas of Charles Bridge and Prague Castle from this grand riverside apartment along the Vltava River in Prague's picturesque Old Town.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2500,
    "location": "Prague",
    "country": "Czech Republic",
    "category": "City Stays",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        14.421254,
        50.087465
      ]
    }
  },
  {
    "title": "Tropical Beach House in Goa",
    "description": "Relax in a vibrant Portuguese-influenced beach house nestled among lush palm groves in North Goa. Enjoy open verandas, sea breezes, and quick strolls down to the golden Arabian Sea sands.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=60"
    },
    "price": 25000,
    "location": "North Goa",
    "country": "India",
    "category": "Beachfront",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        73.82785,
        15.498807
      ]
    }
  },
  {
    "title": "Heritage Haveli in Jaipur",
    "description": "Experience royal Rajputana splendor in this meticulously restored heritage haveli in Jaipur. Features hand-carved stone jharokhas, marble courtyards, fountain gardens, and traditional Rajasthani hospitality.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=60"
    },
    "price": 32000,
    "location": "Jaipur",
    "country": "India",
    "category": "Heritage",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        75.81248,
        26.920341
      ]
    }
  },
  {
    "title": "Cliffside Retreat in Bali",
    "description": "Perched dramatic cliffs above the Indian Ocean in Uluwatu, this open-air architectural retreat offers 180-degree ocean views, infinity pools, and world-class sunset panoramas.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=60"
    },
    "price": 4200,
    "location": "Uluwatu",
    "country": "Indonesia",
    "category": "Design",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        122.59274,
        0.951852
      ]
    }
  },
  {
    "title": "Traditional Ryokan in Kyoto",
    "description": "Experience authentic Japanese hospitality in this historic wooden machiya ryokan in Kyoto's historic Gion district. Features tatami mat suites, shoji sliding screens, and a serene private zen garden.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=60"
    },
    "price": 3800,
    "location": "Kyoto",
    "country": "Japan",
    "category": "Heritage",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        135.76918,
        35.006172
      ]
    }
  },
  {
    "title": "Safari Camp in Maasai Mara",
    "description": "Stay in elevated luxury safari tents overlooking the golden savannah of Maasai Mara. Witness grazing zebras and lions from your private timber viewing deck under vast African skies.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=60"
    },
    "price": 5400,
    "location": "Maasai Mara",
    "country": "Kenya",
    "category": "Camping",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        35.42232,
        -0.940234
      ]
    }
  },
  {
    "title": "Vintage Motel on Route 66",
    "description": "Relive mid-century American road trip nostalgia in this lovingly restored neon-lit roadside motel in Seligman, Arizona, along the world-famous historic Route 66.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=60"
    },
    "price": 1350,
    "location": "Seligman",
    "country": "United States",
    "category": "Budget Stays",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -112.875444,
        35.326764
      ]
    }
  },
  {
    "title": "Summer House in Cornwall",
    "description": "Spend tranquil coastal holidays in this whitewashed sea cottage in St Ives, Cornwall. Features panoramic ocean views over granite headlands, sandy coves, and harbor art studios.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2600,
    "location": "St Ives",
    "country": "United Kingdom",
    "category": "Bed & Breakfasts",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -5.480471,
        50.212463
      ]
    }
  },
  {
    "title": "Vineyard Cottage in Napa Valley",
    "description": "Wake to morning mist rolling over Cabernet grapevines in this romantic countryside cottage in St. Helena. Surrounded by historic wineries, olive trees, and private vineyard tasting patios.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=60"
    },
    "price": 3850,
    "location": "St. Helena",
    "country": "United States",
    "category": "Vineyards",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -122.470303,
        38.505261
      ]
    }
  },
  {
    "title": "Glass Igloo in Lapland",
    "description": "Sleep under the Arctic night sky in a heated thermal glass igloo in Rovaniemi, Finland. Enjoy front-row views of the dancing Aurora Borealis surrounded by snow-laden pine forests.",
    "image": {
      "filename": "AthithiBandhu_DEV/bn3idgvvmfloa7uwratg",
      "url": "https://res.cloudinary.com/a8mpmnlo/image/upload/v1791998070/AthithiBandhu_DEV/bn3idgvvmfloa7uwratg.jpg"
    },
    "price": 4600,
    "location": "Rovaniemi",
    "country": "Finland",
    "category": "Arctic",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        25.730928,
        66.50259
      ]
    }
  },
  {
    "title": "Luxury Desert Camp in Morocco",
    "description": "Immerse yourself in Saharan wonders in this luxury Berber tented camp nestled among the towering orange dunes of Erg Chebbi in Merzouga, complete with campfire storytelling and camel treks.",
    "image": {
      "filename": "AthithiBandhu_DEV/fdm3eaul7exuwjb5zfie",
      "url": "https://res.cloudinary.com/a8mpmnlo/image/upload/v1791997709/AthithiBandhu_DEV/fdm3eaul7exuwjb5zfie.jpg"
    },
    "price": 2400,
    "location": "Merzouga",
    "country": "Morocco",
    "category": "Desert Stays",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -4.014088,
        31.099917
      ]
    }
  },
  {
    "title": "Overwater Bungalow in Bora Bora",
    "description": "Perched right over Bora Bora's translucent turquoise lagoon, this luxury thatched bungalow offers direct sea access, private sundeck, and panoramic views of Mount Otemanu.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60"
    },
    "price": 8800,
    "location": "Bora Bora",
    "country": "French Polynesia",
    "category": "Beachfront",
    "isGuestFavourite": true,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -151.736389,
        -16.494444
      ]
    }
  },
  {
    "title": "Boutique Hotel in Istanbul",
    "description": "Stay in an exquisite historic hotel in Sultanahmet, Istanbul. Features rooftop terrace dining overlooking the majestic domes of Hagia Sophia, the Blue Mosque, and the Bosphorus Strait.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2800,
    "location": "Sultanahmet",
    "country": "Turkey",
    "category": "Domes",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        36.825172,
        41.085998
      ]
    }
  },
  {
    "title": "Traditional Riad in Agra",
    "description": "A peaceful view in the heart of Agra's vibrant culture. Features intricate pietra dura inlays, carved marble relief panels, cypress-lined Charbagh gardens, and a majestic central reflection pool.\r\n",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2200,
    "location": "Agra",
    "country": "India",
    "category": "Heritage",
    "isGuestFavourite": true,
    "geometry": {
      "type": "Point",
      "coordinates": [
        78.00882,
        27.17493
      ]
    }
  },
  {
    "title": "Lake House in Queenstown",
    "description": "Wake up to dramatic Southern Alps reflections in Lake Wakatipu from this contemporary glass-front lake house in Queenstown, New Zealand. Features hot tubs and panoramic mountain vistas.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=60"
    },
    "price": 3800,
    "location": "Queenstown",
    "country": "New Zealand",
    "category": "Lakefront",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        168.66133,
        -45.032063
      ]
    }
  },
  {
    "title": "Jungle Lodge in Costa Rica",
    "description": "Surround yourself with tropical rainforest and hot spring rivers at the base of Arenal Volcano in La Fortuna. Features open observation decks, tropical bird gardens, and canopy views.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2800,
    "location": "La Fortuna",
    "country": "Costa Rica",
    "category": "Forest Retreats",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -84.64452,
        10.471361
      ]
    }
  },
  {
    "title": "Beach House in Cape Town",
    "description": "Experience premier coastal living in this designer oceanfront villa along Camps Bay in Cape Town. Features direct views of the Twelve Apostles peaks, white sands, and Atlantic sunsets.",
    "image": {
      "filename": "AthithiBandhu_DEV/ogmgaph3zujcxbfljs6q",
      "url": "https://res.cloudinary.com/a8mpmnlo/image/upload/v1791998262/AthithiBandhu_DEV/ogmgaph3zujcxbfljs6q.jpg"
    },
    "price": 3800,
    "location": "Camps Bay",
    "country": "South Africa",
    "category": "Beachfront",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        18.378263,
        -33.95112
      ]
    }
  },
  {
    "title": "Luxury Hotel in New York",
    "description": "Stay in five-star modern elegance in midtown Manhattan near Central Park. Features skyline corner suites, marble bathrooms, tailored room service, and stunning city views.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=800&q=60"
    },
    "price": 5800,
    "location": "Manhattan",
    "country": "United States",
    "category": "City Stays",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -73.95709,
        40.789352
      ]
    }
  },
  {
    "title": "Summer Villa in Mallorca",
    "description": "Enjoy a sun-drenched Mediterranean summer in this secluded Spanish stone finca in Mallorca. Features private infinity pool, lemon groves, and sweeping coastal views.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=60"
    },
    "price": 4900,
    "location": "Mallorca",
    "country": "Spain",
    "category": "Villas",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        2.983333,
        39.616667
      ]
    }
  },
  {
    "title": "A-Frame Cabin in the Woods",
    "description": "Unwind in a cozy cedar A-frame cabin surrounded by towering Douglas firs and snowy peaks in Whistler, British Columbia. Features woodstove warmth, outdoor hot tub, and ski trails.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=60"
    },
    "price": 3200,
    "location": "Whistler",
    "country": "Canada",
    "category": "Forest Retreats",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -122.95495,
        50.1151
      ]
    }
  },
  {
    "title": "Overwater Escape in the Maldives",
    "description": "Wake to crystal turquoise lagoons in this secluded overwater stilt bungalow in North Malé Atoll, Maldives. Features glass viewing floors, private sun deck, and direct reef access.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=60"
    },
    "price": 9200,
    "location": "North Malé Atoll",
    "country": "Maldives",
    "category": "Beachfront",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        73.651907,
        4.37485
      ]
    }
  },
  {
    "title": "Luxury Glass House in the Mountains",
    "description": "Experience visionary minimalist architecture in this cantilevered glass home in Interlaken, Switzerland. Features floor-to-ceiling glass walls framing the Jungfrau, Eiger, and alpine valleys.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60"
    },
    "price": 6800,
    "location": "Interlaken",
    "country": "Switzerland",
    "category": "Design",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        7.85602,
        46.684875
      ]
    }
  },
  {
    "title": "Traditional Houseboat in Srinagar",
    "description": "Discover Kashmir's floating paradise aboard a handcrafted cedarwood houseboat moored on tranquil Dal Lake in Srinagar. Features carved walnut woodwork, Shikara rides, and Himalayan backdrop.",
    "image": {
      "filename": "AthithiBandhu_DEV/xa4gbg2qmnvjbpxywjpu",
      "url": "https://res.cloudinary.com/a8mpmnlo/image/upload/v1791998218/AthithiBandhu_DEV/xa4gbg2qmnvjbpxywjpu.jpg"
    },
    "price": 9500,
    "location": "Srinagar",
    "country": "India",
    "category": "Lakefront",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        74.82129,
        34.07475
      ]
    }
  },
  {
    "title": "Luxury Desert Villa in Rajasthan",
    "description": "Indulge in royal desert living in this carved golden sandstone palace villa on the outskirts of Jaisalmer. Features arched jharokha balconies, frescoed courtyards, and Thar desert star-gazing.",
    "image": {
      "filename": "AthithiBandhu_DEV/qtdhlhlqst2wcwhubtjo",
      "url": "https://res.cloudinary.com/a8mpmnlo/image/upload/v1791998343/AthithiBandhu_DEV/qtdhlhlqst2wcwhubtjo.jpg"
    },
    "price": 18000,
    "location": "Jaisalmer",
    "country": "India",
    "category": "Desert Stays",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        70.911514,
        26.913721
      ]
    }
  },
  {
    "title": "Seaside Stone Cottage in Portugal",
    "description": "Stay in a picturesque whitewashed coastal cottage nestled above the golden limestone cliffs and turquoise coves of the Algarve in Portugal. Features terracotta terraces and sea vistas.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=60"
    },
    "price": 2900,
    "location": "Algarve",
    "country": "Portugal",
    "category": "Countryside",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        -7.935278,
        37.014444
      ]
    }
  },
  {
    "title": "Private Island Beach Bungalow",
    "description": "Escape to an untouched paradise bungalow on a private island in El Nido, Palawan. Surrounded by towering limestone karsts, emerald lagoons, and pristine white sands in the Philippines.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=60"
    },
    "price": 4800,
    "location": "Palawan",
    "country": "Philippines",
    "category": "Beachfront",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        118.5,
        9.5
      ]
    }
  },
  {
    "title": "Snowy Mountain Chalet in Hokkaido",
    "description": "Enjoy world-renowned deep powder snow in this modern cedar chalet in Niseko, Japan. Features a private outdoor hot spring onsen, heated gear room, and panoramic views of Mount Yotei.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=800&q=60"
    },
    "price": 6200,
    "location": "Niseko",
    "country": "Japan",
    "category": "Mountains",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        140.68782,
        42.804512
      ]
    }
  },
  {
    "title": "Modern Skyline Penthouse in Seoul",
    "description": "Experience high-energy contemporary Korean living from this sky penthouse in Gangnam, Seoul. Boasts wraparound floor-to-ceiling glass, designer furniture, and night views of the Han River.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=60"
    },
    "price": 5200,
    "location": "Gangnam",
    "country": "South Korea",
    "category": "City Stays",
    "isGuestFavourite": false,
    "geometry": {
      "type": "Point",
      "coordinates": [
        127.04646,
        37.51807
      ]
    }
  },
  {
    "title": "Countryside Farmhouse in Tuscany",
    "description": "Relax in an authentic stone farmhouse nestled among rolling Val d'Orcia hills and cypress avenues near Siena, Italy. Complete with rustic kitchen, outdoor dining pergola, and olive orchard views.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=60"
    },
    "price": 4100,
    "location": "Siena",
    "country": "Italy",
    "category": "Countryside",
    "isGuestFavourite": true,
    "geometry": {
      "type": "Point",
      "coordinates": [
        11.332266,
        43.31921
      ]
    }
  }
];

module.exports = { data: sampleListings };
