const axios = require('axios');

const logger = require('../lib/logger');

class Services {

  async publicPhotos(){
    const ctx = 'publicPhotos-service';
      try {
        return await axios.get('https://api.flickr.com/services/feeds/photos_public.gne?format=json')
      } catch (error) {
        logger.error(cx, 'Failed to fetch photos');
        console.error(error);
      }
  }
}

module.exports = Services;
