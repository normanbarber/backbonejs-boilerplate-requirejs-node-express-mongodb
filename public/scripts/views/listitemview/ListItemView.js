define(['text!views/listitemview/ListItemViewTemplate.html'],
    function (ListItemViewTemplate) {
        var ListItemView = Backbone.View.extend({
            el: $('#itemswrapper'),
            initialize:function() {
            },
            events: {
                'click .new-model':'newModel_Listener',
            },
            render:function () {
                // console.log('this.collection ' + this.collection);
                this.$el.html(_.template(ListItemViewTemplate, {listcollection: this.collection.toJSON()}));
                return this;
            },
            // trigger when add new model button is clicked
            newModel_Listener: function(){
                var timestamp = new Date();
                var listitemslength = this.collection.length + 1;
                this.model.set('name', 'Model ' + listitemslength);
                this.model.set('date', timestamp);
                this.collection.add(this.model); 
                var self = this;
                this.model.save(null, {
                    success: function (model) {
                        self.render();
                        console.log('Success! Object saved successfully');
                    },
                    error: function () {
                        console.log('Error An error occurred while trying to delete this item');
                    }
                });
            },
        });
        return ListItemView;
    });