define ["lodash", "babylon", "c/gui", "zepto"], (_, BABYLON, GUI, $) ->

    class BarGUI extends GUI


        update: (val) ->
            @bar.width val

        attach: () ->
            @wrapper = $ "<div class='barGUI' id='#{@name}' />"

            @styles = {
                top: @opts.y
                width: @opts.width
                height: @opts.height
            }

            @styles[@opts.pos] = @opts.x

            @wrapper.css @styles

            @bar = $ "<div class='barGUI__indicator' />"

            @bar.css "background", @opts.colour

            @wrapper.append @bar

            $("body").append @wrapper



    return BarGUI