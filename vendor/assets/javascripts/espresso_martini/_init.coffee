root = exports ? this

root.App = {}
root.EspressoMartini = {}
root.Component = {}
root.Tools = {}

if Turbolinks?
  $(document).on "page:load turbolinks:load", ->
    EspressoMartini.init()
else
  $(document).on "ready", ->
    EspressoMartini.init()

# init
EspressoMartini.init = ->
  # do something that need to be init at here.
