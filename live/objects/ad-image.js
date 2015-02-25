describe('AdCreative', function() {
  'use strict';

  var  imageHash;
  var now = (new Date()).toUTCString();

  it('creates', function(done) {
    if (!FormData)
      throw new Error('AdImage live tests need FormData implementation');
    var formData = new FormData();
    var filename = '1200x628.gif';
    formData.append(filename, b64toBlob(base64Img_1280_628, 'image/gif'), filename);
    formData.append('contender.gif', b64toBlob(base64Img_1280_628, 'image/gif'), 'contender.gif');
    var adImage = new api.AdImage(null, testData.accountId);
    adImage.create(formData).then(function(data) {
      imageHash = adImage.hash;
      done();
    })
    .catch(done);
  });

  // it('reads', function(done) {
  //   checkCreativeId(done);
  //   var adCreative = new api.AdCreative(creativeId);
  //   adCreative.read(['name', 'title', 'body', 'object_url', 'image_hash'])
  //     .then(function() {
  //       adCreative.name.should.be.ok;
  //       done();
  //     })
  //     .catch(done);
  // });

  // it('updates', function(done) {
  //   checkCreativeId(done);
  //   var adCreative = new api.AdCreative(creativeId, testData.accountId);
  //   var now = (new Date()).toUTCString();
  //   adCreative.name = 'SDK TEST AD-CREATIVE [UPDATED] - ' + now;
  //   adCreative.update()
  //     .then(function(data) {
  //       data.success.should.be.true;
  //       done();
  //     })
  //     .catch(done);
  // });

  // it('deletes', function(done) {
  //   checkCreativeId(done);
  //   var adCreative = new api.AdCreative(creativeId, testData.accountId);
  //   adCreative.delete()
  //     .then(function(data) {
  //       data.success.should.be.true;
  //       done();
  //     })
  //     .catch(done);
  // });

  function checkImageHash(done) {
    if (!imageHash) {
      done(new Error('No imageHash'));
      return;
    }
  }

  /**
   * Convert base64 data to Blob
   * Thanks to Jeremy Banks (http://stackoverflow.com/users/1114/jeremy-banks)
   * @see     {link}    http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
   * @param   {string}  b64Data
   * @param   {string}  contentType
   * @param   {int}     sliceSize
   * @return  {Blob}
   */
  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  // 1280px x 628px placehold.it image
  var base64Img_1280_628 = 'R0lGODdhsAR0AuMAAMzMzJaWlsXFxbGxsb6+vpycnKqqqre3t6OjowAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAsAR0AgAE/hDISau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8eP/iBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavXr2DDih1LtqzZs2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt27hz697Nu7fv38CDCx9OvLjx48iTK1/OvLnz59CjS59Ovbr169iza9/Ovbv37+DDix9Pvrz58+jTq1/Pvr379/Djy59Pv779+/jz69/Pv7///wAG/ijggAQWaOCBCCao4IIMNujggxBGKOGEFFZo4YUYZqjhhhx26OGHIIYo4ogklmjiiSimqOKKLLbo4oswxijjjDTWaOONOOao44489ujjj0AGKeSQRBZp5JFIJqnkkkw26eSTUEYp5ZRUVmnllVhmqeWWXHbp5ZdghinmmGSWaeaZaKap5ppstunmm3DGKeecdNZp55145qnnnnz26eefgAYq6KCEFmrooYgmquiijDbq6KOQRirppJRWaumlmGaq6aacdurpp6CGKuqopJZq6qmopqrqqqy26uqrsMYq66y01mrrrbjmquuuvPbq66/ABivssMQWa+yxyCar7LLM/jbr7LPQRivttNRWa+212Gar7bbcduvtt+CGK+645JZr7rnopqvuuuy26+678MYr77z01mvvvfjmq+++/Pbr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';
});
