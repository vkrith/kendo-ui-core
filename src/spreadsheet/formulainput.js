(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo, window) {
    var FormulaInput = kendo.ui.Widget.extend({
        init: function(element, options) {
            kendo.ui.Widget.call(this, element, options);

            this.element.addClass("k-spreadsheet-formula-input")
                        .attr("contenteditable", true);

            this.element.on("blur", this._blur.bind(this));

            this.scroller = this.options.scroller;
            this.scrollProxy = this.scroll.bind(this);

            this.selectProxy  = this._select.bind(this);
        },

        options: {
            name: "FormulaInput",
            position: "relative"
        },

        events: [
            "change"
        ],

        _blur: function(e) {
            this.deactivate();
        },

        //TODO: test
        _select: function() {
            var nodes = this.element[0].childNodes;
            var length = nodes.length;

            if (!length) {
                return;
            }

            var selection = window.getSelection();
            var range = document.createRange();

            range.setStartAfter(nodes[nodes.length - 1]);

            selection.removeAllRanges();
            selection.addRange(range);
        },

        activate: function(options) {
            options = options || {};
            this.position(options.offset);
            this.value(options.value);

            this.element.show().focus();

            this._isActive = true;

            setTimeout(this.selectProxy);
        },

        deactivate: function() {
            if (!this._isActive) {
                return;
            }

            //TODO: pass a range here or a primitive value
            this.trigger("change", {
                value: this.element.html()
            });

            this.element.hide();
            this._isActive = false;
        },

        isActive: function() {
            return this._isActive;
        },

        position: function(offset) {
            if (!offset) {
                return;
            }

            this.element
                .css({
                    "position": this.options.position,
                    "top": offset.top + "px",
                    "left": offset.left + "px"
                });
        },

        value: function(value) {
            if (value === undefined) {
                return this.element.html();
            }

            this.element.html(value);
        },

        scroll: function() {
            console.log("scroll");
        },

        destroy: function() {
        }
    });

    kendo.spreadsheet.FormulaInput = FormulaInput;
})(kendo, window);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
