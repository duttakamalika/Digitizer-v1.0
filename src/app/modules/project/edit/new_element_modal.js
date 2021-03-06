(function() {  'use strict';

  var module = angular.module('app.activity');

  module.service('newActivityModal', newActivityModal);

  newActivityModal.$inject = ['activityResource', 'commonModal', 'notificator'];
  function newActivityModal(activityResource, commonModal, notificator) {
    var that = this;
    this.modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Adding new activity',
      bodyText: 'Activity Creation'
    };
    this.modalDefaults = {
      windowClass: 'small-modal'
    };

    this.getDeleteMethod = function(activities) {
      return function(activity) {
        commonModal.show(that.modalDefaults,that.modalOptions).then(function() {
          activityResource.delete(activity, function() {
            var index = activities.indexOf(activity);
            activities.splice(index,1);
            notificator.success('The activity was successfully created');
          });
        });
      };
    };
  }
})();
