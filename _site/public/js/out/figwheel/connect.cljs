(ns figwheel.connect (:require [website.dev] [figwheel.client] [figwheel.client.utils]))
(figwheel.client/start {:open-urls ["http://localhost:3449/index.html"], :build-id "app", :websocket-url "ws://localhost:3449/figwheel-ws"})

