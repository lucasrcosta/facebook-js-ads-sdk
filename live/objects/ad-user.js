describe('AdUser', function() {
  'use strict';

  describe('connection objects', function() {

    it('gets Ad Accounts', function(done) {
      var adUser = new api.AdUser('me');
      adUser.getAdAccounts()
        .then(function(data) {
          data.should.be.an('array');
          done();
        })
        .catch(done);
    });

  });

});
