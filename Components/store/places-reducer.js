import axios from 'axios'
import { hasAction } from 'expo/build/StoreReview'

export const placesState = {
  recent: [],
  nearby: [],
  hashMap: {}
}

const dummyData = {
  businesses: [
    {
      id: 't03ZbaLQP3MrMuUGb6MQdw',
      alias: 'starbucks-new-york-506',
      name: 'Starbucks',
      image_url:
        'https://s3-media4.fl.yelpcdn.com/bphoto/LiaYmeI8RlSKE03dB85OOw/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/starbucks-new-york-506?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 43,
      categories: [
        {
          alias: 'coffee',
          title: 'Coffee & Tea'
        }
      ],
      rating: 2,
      coordinates: {
        latitude: 40.704653,
        longitude: -74.009001
      },
      transactions: [],
      price: '$$',
      location: {
        address1: '110 Pearl Street',
        address2: '',
        address3: '',
        city: 'New York',
        zip_code: '10005',
        country: 'US',
        state: 'NY',
        display_address: ['110 Pearl Street', 'New York, NY 10005']
      },
      phone: '+12124826530',
      display_phone: '(212) 482-6530',
      distance: 12.782196286837976
    },
    {
      id: 'TL-YbRD4L7gIIB2OrL8WKQ',
      alias: 'lenwich-new-york-21',
      name: 'Lenwich',
      image_url:
        'https://s3-media3.fl.yelpcdn.com/bphoto/EJouM-DEBDgxoPDYicsc8g/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/lenwich-new-york-21?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 48,
      categories: [
        {
          alias: 'sandwiches',
          title: 'Sandwiches'
        },
        {
          alias: 'salad',
          title: 'Salad'
        },
        {
          alias: 'breakfast_brunch',
          title: 'Breakfast & Brunch'
        }
      ],
      rating: 2.5,
      coordinates: {
        latitude: 40.7046216116255,
        longitude: -74.0092379365535
      },
      transactions: [],
      price: '$$',
      location: {
        address1: '114 Pearl Street',
        address2: '',
        address3: '',
        city: 'New York',
        zip_code: '10005',
        country: 'US',
        state: 'NY',
        display_address: ['114 Pearl Street', 'New York, NY 10005']
      },
      phone: '+12123852828',
      display_phone: '(212) 385-2828',
      distance: 13.341177702318689
    },
    {
      id: 'UMgivwsBSeUe1yXgtsiu9g',
      alias: 'hanover-square-park-new-york',
      name: 'Hanover Square Park',
      image_url:
        'https://s3-media2.fl.yelpcdn.com/bphoto/m1DZykjb4_3577PcwVcUZQ/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/hanover-square-park-new-york?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 3,
      categories: [
        {
          alias: 'parks',
          title: 'Parks'
        }
      ],
      rating: 3.5,
      coordinates: {
        latitude: 40.7048674785657,
        longitude: -74.0089863538742
      },
      transactions: [],
      location: {
        address1: 'British Memorial Garden',
        address2: '',
        address3: 'Hanover Square and Pearl Street',
        city: 'New York',
        zip_code: '10005',
        country: 'US',
        state: 'NY',
        display_address: [
          'British Memorial Garden',
          'Hanover Square and Pearl Street',
          'New York, NY 10005'
        ]
      },
      phone: '',
      display_phone: '',
      distance: 14.30791642876068
    },
    {
      id: '_XPusO4eMV3L9TiD38I4gw',
      alias: 'al-horno-lean-mexican-kitchen-new-york-16',
      name: 'Al Horno Lean Mexican Kitchen',
      image_url:
        'https://s3-media1.fl.yelpcdn.com/bphoto/5JO2nayxS9fIFuOVGHYCgA/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/al-horno-lean-mexican-kitchen-new-york-16?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 45,
      categories: [
        {
          alias: 'mexican',
          title: 'Mexican'
        }
      ],
      rating: 3,
      coordinates: {
        latitude: 40.7044967,
        longitude: -74.009238
      },
      transactions: ['pickup', 'delivery'],
      price: '$$',
      location: {
        address1: '110 Pearl St',
        address2: '',
        address3: null,
        city: 'New York',
        zip_code: '10005',
        country: 'US',
        state: 'NY',
        display_address: ['110 Pearl St', 'New York, NY 10005']
      },
      phone: '+12124808500',
      display_phone: '(212) 480-8500',
      distance: 17.794305976140716
    },
    {
      id: 'I_YPy_YRtZFyWOSWs-gv4A',
      alias: 'luckyim-thai-new-york',
      name: 'Luckyim Thai',
      image_url:
        'https://s3-media3.fl.yelpcdn.com/bphoto/aJ-lYs-cknkLwvq0m96yeg/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/luckyim-thai-new-york?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 143,
      categories: [
        {
          alias: 'foodtrucks',
          title: 'Food Trucks'
        },
        {
          alias: 'thai',
          title: 'Thai'
        }
      ],
      rating: 4,
      coordinates: {
        latitude: 40.7045699,
        longitude: -74.00886
      },
      transactions: [],
      price: '$',
      location: {
        address1: '10 Hanover Sq',
        address2: '',
        address3: '',
        city: 'New York',
        zip_code: '10005',
        country: 'US',
        state: 'NY',
        display_address: ['10 Hanover Sq', 'New York, NY 10005']
      },
      phone: '+19293828537',
      display_phone: '(929) 382-8537',
      distance: 22.815331928862793
    },
    {
      id: 'yJdzvnFvCHeVrnOdEOWGvw',
      alias: 'lenwich-new-york-33',
      name: 'Lenwich',
      image_url: '',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/lenwich-new-york-33?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 1,
      categories: [
        {
          alias: 'coffee',
          title: 'Coffee & Tea'
        },
        {
          alias: 'breakfast_brunch',
          title: 'Breakfast & Brunch'
        },
        {
          alias: 'sandwiches',
          title: 'Sandwiches'
        }
      ],
      rating: 4,
      coordinates: {
        latitude: 40.70457,
        longitude: -74.00886
      },
      transactions: ['pickup', 'delivery'],
      location: {
        address1: '10 Hanover Sq',
        address2: null,
        address3: null,
        city: 'New York',
        zip_code: '10005',
        country: 'US',
        state: 'NY',
        display_address: ['10 Hanover Sq', 'New York, NY 10005']
      },
      phone: '+12123852828',
      display_phone: '(212) 385-2828',
      distance: 22.815331928862793
    },
    {
      id: 'FFOfIf3yEy-j2eZadKMo_Q',
      alias: 'periscope-coffee-on-pearl-street-new-york-4',
      name: 'Periscope Coffee on Pearl Street',
      image_url:
        'https://s3-media2.fl.yelpcdn.com/bphoto/dkyWgRntRzamWHnHdYEDMA/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/periscope-coffee-on-pearl-street-new-york-4?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 60,
      categories: [
        {
          alias: 'coffee',
          title: 'Coffee & Tea'
        },
        {
          alias: 'foodtrucks',
          title: 'Food Trucks'
        }
      ],
      rating: 5,
      coordinates: {
        latitude: 40.7050386,
        longitude: -74.0088547
      },
      transactions: [],
      price: '$',
      location: {
        address1: '123 Pearl St',
        address2: '',
        address3: '',
        city: 'New York',
        zip_code: '10005',
        country: 'US',
        state: 'NY',
        display_address: ['123 Pearl St', 'New York, NY 10005']
      },
      phone: '+19177890771',
      display_phone: '(917) 789-0771',
      distance: 25.33789056444736
    },
    {
      id: '_CBj4pv-I9hbiq35LFoNJg',
      alias: 'bluestone-lane-new-york-13',
      name: 'Bluestone Lane',
      image_url:
        'https://s3-media3.fl.yelpcdn.com/bphoto/OaVNOEZa_gZRZuW_820_Fw/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/bluestone-lane-new-york-13?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 53,
      categories: [
        {
          alias: 'cafes',
          title: 'Cafes'
        },
        {
          alias: 'coffeeroasteries',
          title: 'Coffee Roasteries'
        }
      ],
      rating: 4,
      coordinates: {
        latitude: 40.7047584413614,
        longitude: -74.0085431188345
      },
      transactions: [],
      price: '$',
      location: {
        address1: '90 Water St',
        address2: '',
        address3: null,
        city: 'New York',
        zip_code: '10005',
        country: 'US',
        state: 'NY',
        display_address: ['90 Water St', 'New York, NY 10005']
      },
      phone: '+17183746858',
      display_phone: '(718) 374-6858',
      distance: 31.666639557155285
    },
    {
      id: '7YxyC11C6gTKGg2qoiF4XQ',
      alias: 'banh-mi-cart-new-york',
      name: 'Banh Mi Cart',
      image_url:
        'https://s3-media2.fl.yelpcdn.com/bphoto/T9hX8NRQa68Gupz4CrnXUA/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/banh-mi-cart-new-york?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 114,
      categories: [
        {
          alias: 'vietnamese',
          title: 'Vietnamese'
        },
        {
          alias: 'foodtrucks',
          title: 'Food Trucks'
        }
      ],
      rating: 3.5,
      coordinates: {
        latitude: 40.704542762178,
        longitude: -74.0094631875107
      },
      transactions: [],
      price: '$',
      location: {
        address1: 'Pearl St & Hanover Sq',
        address2: '',
        address3: '',
        city: 'New York',
        zip_code: '10038',
        country: 'US',
        state: 'NY',
        display_address: ['Pearl St & Hanover Sq', 'New York, NY 10038']
      },
      phone: '+19174957071',
      display_phone: '(917) 495-7071',
      distance: 43.00738678906639
    },
    {
      id: '7jyZrEbZuUC3GKODVQW6Hg',
      alias: 'queen-elizabeth-ii-september-11th-garden-new-york',
      name: 'Queen Elizabeth II September 11th Garden',
      image_url:
        'https://s3-media3.fl.yelpcdn.com/bphoto/aUUk1jqtO4Uza3_2Pi-xNQ/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/queen-elizabeth-ii-september-11th-garden-new-york?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 1,
      categories: [
        {
          alias: 'parks',
          title: 'Parks'
        }
      ],
      rating: 4,
      coordinates: {
        latitude: 40.7047027333123,
        longitude: -74.0094458502537
      },
      transactions: [],
      location: {
        address1: '1 Hanover Sq',
        address2: '',
        address3: '',
        city: 'New York',
        zip_code: '10004',
        country: 'US',
        state: 'NY',
        display_address: ['1 Hanover Sq', 'New York, NY 10004']
      },
      phone: '',
      display_phone: '',
      distance: 44.747549529246285
    },
    {
      id: 'ng1wpKuQOFjZNCOe5YTwHA',
      alias: 'chopstix-new-york',
      name: 'Chopstix',
      image_url:
        'https://s3-media1.fl.yelpcdn.com/bphoto/qTA42UC6SA1cQANwIyRrAQ/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/chopstix-new-york?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 14,
      categories: [
        {
          alias: 'foodtrucks',
          title: 'Food Trucks'
        },
        {
          alias: 'chinese',
          title: 'Chinese'
        }
      ],
      rating: 3,
      coordinates: {
        latitude: 40.7043655812028,
        longitude: -74.0091101794667
      },
      transactions: [],
      price: '$',
      location: {
        address1: '1 Hanover Square',
        address2: '',
        address3: 'Old Slip (water & Pearl)',
        city: 'New York',
        zip_code: '10004',
        country: 'US',
        state: 'NY',
        display_address: [
          '1 Hanover Square',
          'Old Slip (water & Pearl)',
          'New York, NY 10004'
        ]
      },
      phone: '',
      display_phone: '',
      distance: 45.642219786857886
    },
    {
      id: 'RBN39979hDe1MMCaO65zXA',
      alias: 'traders-cafe-new-york-3',
      name: 'Traders Cafe',
      image_url: '',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/traders-cafe-new-york-3?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 1,
      categories: [
        {
          alias: 'delis',
          title: 'Delis'
        },
        {
          alias: 'cafes',
          title: 'Cafes'
        }
      ],
      rating: 1,
      coordinates: {
        latitude: 40.70527,
        longitude: -74.00888
      },
      transactions: [],
      location: {
        address1: '76 Beaver St',
        address2: '',
        address3: '',
        city: 'New York',
        zip_code: '10005',
        country: 'US',
        state: 'NY',
        display_address: ['76 Beaver St', 'New York, NY 10005']
      },
      phone: '+12124820552',
      display_phone: '(212) 482-0552',
      distance: 51.87068772894731
    },
    {
      id: 'N8G8jVuIR740ddT5n2JFxQ',
      alias: 'american-coffee-new-york',
      name: 'American Coffee',
      image_url: '',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/american-coffee-new-york?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 1,
      categories: [
        {
          alias: 'coffee',
          title: 'Coffee & Tea'
        }
      ],
      rating: 4,
      coordinates: {
        latitude: 40.7042940706015,
        longitude: -74.0092451870441
      },
      transactions: [],
      location: {
        address1: '11 Hanover Sq',
        address2: 'Ste 706',
        address3: '',
        city: 'New York',
        zip_code: '10005',
        country: 'US',
        state: 'NY',
        display_address: ['11 Hanover Sq', 'Ste 706', 'New York, NY 10005']
      },
      phone: '+12127852870',
      display_phone: '(212) 785-2870',
      distance: 57.42918615978687
    },
    {
      id: 'upJ9H46PS9mikHto0BNLDA',
      alias: '11-hanover-greek-new-york',
      name: '11 Hanover Greek',
      image_url:
        'https://s3-media2.fl.yelpcdn.com/bphoto/B0cFwRnAXJI8R8nLeIlI4A/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/11-hanover-greek-new-york?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 81,
      categories: [
        {
          alias: 'greek',
          title: 'Greek'
        },
        {
          alias: 'seafood',
          title: 'Seafood'
        },
        {
          alias: 'wine_bars',
          title: 'Wine Bars'
        }
      ],
      rating: 4,
      coordinates: {
        latitude: 40.705264,
        longitude: -74.008854
      },
      transactions: ['pickup', 'delivery'],
      price: '$$$',
      location: {
        address1: '11 Hanover Sq',
        address2: '',
        address3: null,
        city: 'New York',
        zip_code: '10005',
        country: 'US',
        state: 'NY',
        display_address: ['11 Hanover Sq', 'New York, NY 10005']
      },
      phone: '+12127854000',
      display_phone: '(212) 785-4000',
      distance: 57.46829792812453
    },
    {
      id: 'Z_W3doydEDnnG7PPc3fW5Q',
      alias: 'killarney-rose-new-york',
      name: 'Killarney Rose',
      image_url:
        'https://s3-media2.fl.yelpcdn.com/bphoto/b-VSX1W1Ni0_vOSMHZnMQA/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/killarney-rose-new-york?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 138,
      categories: [
        {
          alias: 'pubs',
          title: 'Pubs'
        }
      ],
      rating: 3.5,
      coordinates: {
        latitude: 40.705221802732,
        longitude: -74.008625345126
      },
      transactions: [],
      price: '$$',
      location: {
        address1: '127 Pearl St',
        address2: '',
        address3: '',
        city: 'New York',
        zip_code: '10005',
        country: 'US',
        state: 'NY',
        display_address: ['127 Pearl St', 'New York, NY 10005']
      },
      phone: '+12124221486',
      display_phone: '(212) 422-1486',
      distance: 58.04449505813257
    },
    {
      id: 'HeUybDgFArjeLwdTTiaRTQ',
      alias: 'leonidas-new-york-3',
      name: 'Leonidas',
      image_url:
        'https://s3-media2.fl.yelpcdn.com/bphoto/A372z5F6v1qTwc-DtS2icA/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/leonidas-new-york-3?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 60,
      categories: [
        {
          alias: 'candy',
          title: 'Candy Stores'
        },
        {
          alias: 'coffee',
          title: 'Coffee & Tea'
        }
      ],
      rating: 4,
      coordinates: {
        latitude: 40.705099,
        longitude: -74.009476
      },
      transactions: [],
      price: '$$',
      location: {
        address1: '3 Hanover Sq',
        address2: '',
        address3: '',
        city: 'New York',
        zip_code: '10004',
        country: 'US',
        state: 'NY',
        display_address: ['3 Hanover Sq', 'New York, NY 10004']
      },
      phone: '+12124229600',
      display_phone: '(212) 422-9600',
      distance: 60.97503192838367
    },
    {
      id: 'DJsoVgloRAOrsGM2HQKDoA',
      alias: 'fino-ristorante-new-york-2',
      name: 'Fino Ristorante',
      image_url:
        'https://s3-media1.fl.yelpcdn.com/bphoto/-PoCsVMvVoOFThvO87jCBA/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/fino-ristorante-new-york-2?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 70,
      categories: [
        {
          alias: 'italian',
          title: 'Italian'
        }
      ],
      rating: 3.5,
      coordinates: {
        latitude: 40.705204,
        longitude: -74.00844
      },
      transactions: ['pickup', 'delivery'],
      price: '$$$',
      location: {
        address1: '82 Beaver St',
        address2: '',
        address3: '',
        city: 'New York',
        zip_code: '10005',
        country: 'US',
        state: 'NY',
        display_address: ['82 Beaver St', 'New York, NY 10005']
      },
      phone: '+12128251924',
      display_phone: '(212) 825-1924',
      distance: 64.66584314274304
    },
    {
      id: 'n5BMFJhYcnuOwyKqyZwMbg',
      alias: 'hanover-gourmet-deli-new-york',
      name: 'Hanover Gourmet Deli',
      image_url:
        'https://s3-media2.fl.yelpcdn.com/bphoto/TX3JCrZ1RnyHFta4fEn76A/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/hanover-gourmet-deli-new-york?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 51,
      categories: [
        {
          alias: 'delis',
          title: 'Delis'
        },
        {
          alias: 'sandwiches',
          title: 'Sandwiches'
        }
      ],
      rating: 2.5,
      coordinates: {
        latitude: 40.70499,
        longitude: -74.00961
      },
      transactions: ['pickup', 'delivery'],
      price: '$',
      location: {
        address1: '3 Hanover Sq',
        address2: '',
        address3: '',
        city: 'New York',
        zip_code: '10004',
        country: 'US',
        state: 'NY',
        display_address: ['3 Hanover Sq', 'New York, NY 10004']
      },
      phone: '+12122693232',
      display_phone: '(212) 269-3232',
      distance: 67.68457357307832
    },
    {
      id: 'irRKLFwiIQIVjflbHetLfg',
      alias: 'poke-green-new-york-6',
      name: 'Poke Green',
      image_url:
        'https://s3-media2.fl.yelpcdn.com/bphoto/zB4nCTc6AmnNFxaZKjnvRw/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/poke-green-new-york-6?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 38,
      categories: [
        {
          alias: 'poke',
          title: 'Poke'
        },
        {
          alias: 'hawaiian',
          title: 'Hawaiian'
        }
      ],
      rating: 4,
      coordinates: {
        latitude: 40.7049944,
        longitude: -74.0096537
      },
      transactions: ['pickup', 'delivery'],
      price: '$$',
      location: {
        address1: '3 Hanover Sq',
        address2: null,
        address3: '',
        city: 'New York',
        zip_code: '10004',
        country: 'US',
        state: 'NY',
        display_address: ['3 Hanover Sq', 'New York, NY 10004']
      },
      phone: '+12123613777',
      display_phone: '(212) 361-3777',
      distance: 67.68457357307832
    },
    {
      id: 'B1XdGwZZ5ee2fBdngj7NUw',
      alias: 'underground-pizza-new-york',
      name: 'Underground Pizza',
      image_url:
        'https://s3-media1.fl.yelpcdn.com/bphoto/TVigbmJt8vKz7dXY9CVOiA/o.jpg',
      is_closed: false,
      url:
        'https://www.yelp.com/biz/underground-pizza-new-york?adjust_creative=dc_3nL_wCpMpChkiKh3ZXg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dc_3nL_wCpMpChkiKh3ZXg',
      review_count: 258,
      categories: [
        {
          alias: 'pizza',
          title: 'Pizza'
        },
        {
          alias: 'italian',
          title: 'Italian'
        }
      ],
      rating: 4,
      coordinates: {
        latitude: 40.70499,
        longitude: -74.00961
      },
      transactions: ['pickup', 'delivery'],
      price: '$',
      location: {
        address1: '3 Hanover Sq',
        address2: '',
        address3: '',
        city: 'New York',
        zip_code: '10004',
        country: 'US',
        state: 'NY',
        display_address: ['3 Hanover Sq', 'New York, NY 10004']
      },
      phone: '+12124254442',
      display_phone: '(212) 425-4442',
      distance: 67.68457357307832
    }
  ],
  total: 6700,
  region: {
    center: {
      longitude: -74.0089186,
      latitude: 40.7047495
    }
  }
}

const GET_RECENT = 'GET_RECENT'
const GET_NEARBY = 'GET_NEARBY'

export const getRecent = recent => ({
  type: GET_RECENT,
  recent
})

export const getNearby = nearby => ({
  type: GET_NEARBY,
  nearby
})

export const fetchRecent = () => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://jubjub-server.herokuapp.com/api/places/recent`
    )
    const action = getRecent(data)
    dispatch(action)
  } catch (err) {
    console.log(err)
  }
}

export const fetchNearby = (lat, lng) => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://jubjub-server.herokuapp.com/api/places/nearby/${lat}/${lng}`
    )
    // console.log('THIS IS DATA', dummyData.businesses)
    const action = getNearby(dummyData.businesses)
    dispatch(action)
  } catch (err) {
    console.log(err)
  }
}

const placesReducer = (state = placesState, action) => {
  switch (action.type) {
    case GET_RECENT:
      return { ...state, recent: [action.recent] }
    case GET_NEARBY:
      let hashMap = {}
      // let narrowedDownData = []
      let results = action.nearby

      for (let i = 0; i < results.length; i++) {
        //the below commented out uses Google NearbyPlaces. We can delete this now as we're using Yelp. Just here incase we need to roll back
        // let placeObj = {}
        // placeObj.lat = results[i].geometry.location.lat
        // placeObj.lng = results[i].geometry.location.lng
        // placeObj.icon = results[i].icon
        // placeObj.place_id = results[i].place_id
        // placeObj.name = results[i].name
        // placeObj.types = results[i].types
        // placeObj.vicinity = results[i].vicinity
        // if (results[i].rating) placeObj.rating = results[i].rating
        // if (results[i].photos)
        //   placeObj.photo = results[i].photos[0].photo_reference
        // if (results[i].photos) placeObj.price_level = results[i].price_level
        // narrowedDownData.push(placeObj)

        const splitNameArr = results[i].name.toLowerCase().split(' ')
        splitNameArr.forEach(word => {
          if (hashMap[word]) {
            hashMap[word].push(i)
          } else {
            hashMap[word] = [i]
          }
        })
      }
      // We can delete the commented out lines below. Just here in case we want to remove the hashMap part

      // results.forEach(place => {
      //   let placeObj = {}
      //   placeObj.lat = place.geometry.location.lat
      //   placeObj.lng = place.geometry.location.lng
      //   placeObj.icon = place.icon
      //   placeObj.place_id = place.place_id
      //   placeObj.name = place.name
      //   placeObj.types = place.types
      //   placeObj.vicinity = place.vicinity
      //   if (place.rating) placeObj.rating = place.rating
      //   if (place.photos) placeObj.photo = place.photos[0].photo_reference
      //   if (place.photos) placeObj.price_level = place.price_level
      //   narrowedDownData.push(placeObj)
      // })
      return { ...state, nearby: results, hashMap: hashMap }
    default:
      return state
  }
}

export default placesReducer
