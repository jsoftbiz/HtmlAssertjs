describe("HtmlAssert core", function () {

    it("test a passing div", function () {
        var html = "<dZv><p><div class=\"someclass\" id=\"someid\"></div></p></dZv>";
        var htmlAssert = new HtmlAssert(html);
        HtmlAssert.it("should contain those divs", function () {
            return htmlAssert.p().div("id", "someid", "class", "someclass")
        });
    });

    it("test HTML on Multiple Lines", function () {
        var html = " <div>           <td title=\"en-gb\"\n" +
            "                style=\"166px;\">en-gb</td></div>\n";
        var htmlAssert = new HtmlAssert(html);
        HtmlAssert.it("should contain this td", function () {
            return htmlAssert.td("title", "en-gb", "style", "166px;")
        });
    });

    it("test Attribute With Spaces", function () {
        var html = " <td class=\"main_column main_column1\" title=\"1.26e+3k  (1257592)\" style=\"min-width: 166px; width: 166px; max-width: 166px;\"></td>";
        var htmlAssert = new HtmlAssert(html);
        HtmlAssert.it("should contain those tags", function () {
            return htmlAssert.td("class", "main_column main_column1", "title", "1.26e+3k  (1257592)", "style", "min-width: 166px; width: 166px; max-width: 166px;")
        });
    });

    //TODO test with accesskey attribute with no value

    it("test Similar Multiple Lines", function () {
        var html = "<div><table><tr><div class=\"somediv\"><tr><span id=\"someid\"><div id=\"id1\"><td></td></div></span></tr><div>" +
            "<div class=\"somediv\"><tr><span id=\"someid\"><div id=\"id2\"><td></td></div></span></tr><div>" +
            "<div class=\"somediv\"><tr><span id=\"someid\"><div id=\"id3\"><td></td></div></span></tr>" +
            "<div></div></div></div></div></div></div></tr> </table></div>";
        var htmlAssert = new HtmlAssert(html);
        HtmlAssert.it("should contain those tags", function () {
            return htmlAssert.tr().div("class", "somediv").tr().span("id", "someid").div("id", "id2")
        });
    });

    it("test Passing Lenient Empty Div", function () {
        var html = "<dZv><div></div></dZv>";
        var htmlAssert = new HtmlAssert(html);
        HtmlAssert.it("should contain those tags", function () {
            return htmlAssert.div()
        });
    });

    it("test Passing Strict Empty Div", function () {
        var html = "<div><div></div></div>";
        var htmlAssert = new HtmlAssert(html);
        HtmlAssert.it("should contain those tags", function () {
            return htmlAssert.div()
        });
    });

    //TODO   public void testFailingLenientEmptyDiv() {

    //TODO   public void testFailingStrictEmptyDiv() {

    it("test Passing Lenient Ordered Filled Div", function () {
        var html = "<div><div id=\"someid\" class=\"someclass\"><div class=\"someclass\" ><div></div></div></div></div>";
        var htmlAssert = new HtmlAssert(html);
        HtmlAssert.it("should contain those tags", function () {
            return htmlAssert.div("id", "someid", "class", "someclass")
        });
    });

    it("test Passing Lenient Multiple Filled Div", function () {
        var html = "<div><div id=\"someid\" class=\"someclass\"><div class=\"someclass\" ><div></div></div></div></div>";
        var htmlAssert = new HtmlAssert(html);
        HtmlAssert.it("should contain those tags", function () {
            return htmlAssert.div("id", "someid", "class", "someclass").div("class", "someclass")
        });
    });

    it("test Passing Lenient Multiple Mixed Div", function () {
        var html = "<div><div id=\"someid\" class=\"someclass\"><div class=\"someclass\" ><div></div></div></div></div>";
        var htmlAssert = new HtmlAssert(html);
        HtmlAssert.it("should contain those tags", function () {
            return htmlAssert.div("id", "someid", "class", "someclass").div()
        });
    });


    //TODO public void testPassingStrictOrderedFilledDiv() {
    //TODO public void testPassingStrictUnorderedFilledDiv() {
    //TODO public void testPassingStrictMultipleFilledDiv() {
    //TODO public void testPassingStrictMultipleMixedDiv() {

    it("test Failing Lenient Ordered Filled Div", function () {
        var html = "<div><div id=\"someid\" class=\"someNONclass\"><div class=\"someclass\" ><div></div></div></div></div>";
        var htmlAssert = new HtmlAssert(html);
        expect(function () {
            HtmlAssert.it("should not contain those tags", function () {
                return htmlAssert.div("id", "someid", "class", "someclass")
            });
        }).toThrow();
    });

    it("test Failing Lenient Unordered Filled Div", function () {
        var html = "<div><div id=\"someid\" class=\"someNONclass\"><div class=\"someclass\" ><div></div></div></div></div>";
        var htmlAssert = new HtmlAssert(html);
        expect(function () {
            HtmlAssert.it("should contain those tags", function () {
                return htmlAssert.div("class", "someclass", "id", "someid")
            });
        }).toThrow();
    });

    it("test Failing Lenient Multiple Filled Div", function () {
        var html = "<div><div id=\"someid\" class=\"someclass\"><div class=\"someNONclass\" ><div></div></div></div></div>";
        var htmlAssert = new HtmlAssert(html);
        expect(function () {
            HtmlAssert.it("should contain those tags", function () {
                return htmlAssert.div("id", "someid", "class", "someclass").div("class", "someclass")
            });
        }).toThrow();
    });

    it("test Failing Lenient Multiple Mixed Div", function () {
        var html = "<div><div id=\"someNONid\" class=\"someclass\"><div class=\"someclass\" ><div></div></div></div></div>";
        var htmlAssert = new HtmlAssert(html);
        expect(function () {
            HtmlAssert.it("should contain those tags", function () {
                return htmlAssert.div("id", "someid", "class", "someclass").div()
            });
        }).toThrow();
    });

    //TODO   public void testFailingStrictOrderedFilledDiv() {
    //TODO   public void testFailingStrictUnorderedFilledDiv() {
    //TODO   public void testFailingStrictMultipleFilledDiv() {
    //TODO   public void testFailingStrictMultipleMixedDiv() {

    it("test Failing Lenient Too Many Attr Div", function () {
        var html = "<div><div id=\"someid\" class=\"someclass\" hidden=\"\"><div class=\"someclass\" ><div></div></div></div></div>";
        var htmlAssert = new HtmlAssert(html);
        expect(function () {
            HtmlAssert.it("should contain those tags", function () {
                return htmlAssert.div("id", "someid", "class", "someclass")
            });
        }).toThrow();
    });


    //TODO text() function search for text
/*
    it("test Text Value", function () {
        var html = "<div><tr>content</tr></div>";
        var htmlAssert = new HtmlAssert(html);
        HtmlAssert.it("should contain those tags", function () {
            return htmlAssert.div().text("content");
        });
    });
*/

    /*

     it("", function () {
     var html =
     var htmlAssert = new HtmlAssert(html);
     HtmlAssert.it("should contain those tags", function () {
     return
     });
     });

     */


});

