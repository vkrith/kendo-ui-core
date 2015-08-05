(function() {
    var element;
    var formulaInput;

    module("Spreadsheet FormulaInput", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function createFormulaInput(options) {
        options = options || {};
        formulaInput = new kendo.spreadsheet.FormulaInput(element, options);
    }

    test("decorates div element", function() {
        createFormulaInput();

        equal(element.attr("contenteditable"), "true");
        ok(element.hasClass("k-spreadsheet-formula-input"));
    });

    test("triggers change event on input change", 1, function() {
        createFormulaInput({
            change: function(e) {
                equal(e.value, "foo");
            }
        });

        formulaInput.activate();
        element.html("foo").blur();
    });

    test("value sets input value", function() {
        createFormulaInput();

        formulaInput.value("bar");

        equal(element.html(), "bar");
    });

    test("value gets element value", function() {
        createFormulaInput();

        element.html("bar");

        equal(formulaInput.value(), "bar");
    });

    test("position method defines css offset of the widget", function() {
        createFormulaInput();

        formulaInput.position({
            top: 10,
            left: 20
        });

        equal(element.css("position"), "relative");
        equal(element.css("left"), "20px");
        equal(element.css("top"), "10px");
    });

    test("position method defines css position of the widget", function() {
        createFormulaInput({
            position: "absolute"
        });

        formulaInput.position({
            top: 10,
            left: 20
        });

        equal(element.css("position"), "absolute");
    });

    test("position method returns when argument is undefined", function() {
        createFormulaInput({
            position: "absolute"
        });

        formulaInput.position();

        equal(element.css("position"), "static");
    });

    test("activate method positions the element", function() {
        createFormulaInput({
            position: "absolute"
        });

        formulaInput.activate({
            offset: {
                top: 10,
                left: 20
            }
        });

        equal(element.css("position"), "absolute");
        equal(element.css("left"), "20px");
        equal(element.css("top"), "10px");
    });

    test("activate method sets widget value", function() {
        createFormulaInput();

        formulaInput.activate({
            value: "test"
        });

        equal(element.html(), "test");
    });

    test("activate method shows the element", function() {
        createFormulaInput();

        element.hide();

        formulaInput.activate();

        ok(element.is(":visible"));
    });

    test("activate method sets active state", function() {
        createFormulaInput();

        formulaInput.activate();

        ok(formulaInput.isActive());
    });

    test("deactivate method triggers change event", function() {
        var value = "test";

        createFormulaInput();

        formulaInput.activate({
            value: value
        });

        formulaInput.bind("change", function(e) {
            equal(e.value, value);
        });

        formulaInput.deactivate();
    });

    test("deactivate method hides the element", function() {
        createFormulaInput();

        formulaInput.activate();
        formulaInput.deactivate();

        ok(!element.is(":visible"));
    });

    test("deactivate method disables active state", function() {
        createFormulaInput();

        formulaInput.activate();
        formulaInput.deactivate();

        ok(!formulaInput.isActive());
    });
})();
