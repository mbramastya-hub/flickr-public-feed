
const response = require('../../../../helpers/utils/response');
const Service = require('../../../../helpers/utils/service');
const serviceFlickr = new Service();
const moment = require('moment');

const { CODE } = require('../../../../helpers/lib/httpCode');

/**
 * @class
 * UserQuery
 * 
 * @function getPublicPhotos - A function to get all public photos from flickr.
 * 
 * @param {string} req.params.userId - UserId
 */

class Domain {    
  static async getPublicPhotos(req, res) {
    const cx = 'feeds-getPublicPhotos';
    const { err: errPhotos, data: photos } = await serviceFlickr.publicPhotos();
    if(errPhotos){
        return response.error(res, 'Failed to fetch photos', CODE.INTERNAL_ERROR);
    }
    let mySubString = photos.substring(
      photos.indexOf("[") - 1,
      photos.lastIndexOf("]") + 1
    )
    let data = JSON.parse(mySubString)  
    const allPhotos = data.map(photo => ({
      photoStaticURL: photo.media.m.toString().replace("\\", ""),
      PhotoFlickrURL: photo.link.toString().replace("\\", ""),
      photoOwnerURL: 'https://www.flickr.com/photos/' + photo.author_id,
      photoTitle: photo.title,
      photoPublished: moment(photo.published).format('MM MMMM YYYY'),
      photoOwner: photo.author.substring(
          photo.author.indexOf("\"") + 1,
          photo.author.lastIndexOf("\"") - 1
      ),
      photoTags: photo.tags
  }))
    return response.data(res, 'Successfull Response', allPhotos);
  }
}

module.exports = Domain;
