(ns website.core
  (:require [reagent.core :as reagent]))

;; -------------------------
;; Views

(defn section-component [header & body]
  (into [:div
         [:strong header]]
        body))

(defn online-component []
  [section-component "Online"
   [:p
    [:a {:href "http://twitter.com/bryanwoods"} "TWITTER"]]
   [:p
    [:a {:href "mailto:bryanwoods4e@gmail.com"} "GMAIL"]]])

(defn writing-component []
  [section-component "Writing"
   [:p
    [:a {:href "https://electricliterature.com/embracing-the-worst-thing-someone-can-say-to-you-594235b94d26"}
      "EMBRACING THE WORST THING SOMEONE CAN SAY TO YOU"]
    ", Interview with Darcie Wilder, Electric Literature"]
   [:p
    [:a {:href "https://catapult.co/stories/almost-on-catholicism-belief-and-belonging"}
     "ALMOST"]
    ", Catapult"]
   [:p
    [:a {:href "http://thefanzine.com/experience/"} "EXPERIENCE"]
    ", The Fanzine"]
   [:p
    [:a {:href "http://potluckmag.com/february-2016/2016/2/4/bathtime-disintegration"}
     "BATHTIME DISINTEGRATION"]
    ", Potluck"]
   [:p
    [:a {:href "http://queenmobs.com/2015/12/poem-bryan-woods/"}
     "DISINTEGRATIONS"]
    ", Queen Mob's Tea House"]])

(defn programming-component []
  [section-component "Programming"
   [:p
    [:a {:href "https://techcrunch.com/2010/10/29/facebook-acquires-drop-io-nabs-sam-lessin/"} "MANY"]
    " "
    [:a {:href "http://www.businessinsider.com/howaboutwe-iac-acquisition-2014-6"} "START"]
    " "
    [:a {:href "http://www.psdept.com"} "UPS"]
    " & "
    [:a {:href "http://www.samsung.com"} "AN INTERNATIONAL CORPORATION"]
    " & "
    [:a {:href "http://github.com/bryanwoods"} "OPEN SOURCE"]]
   [:p
    "This web page was written in Clojure, compiled to JavaScript, and rendered with React."
    [:br]
    "Not because it's practical, but because it's funny."
    [:br]
    "You can read its source code "
    [:a {:href "https://github.com/bryanwoods/website/blob/gh-pages/src/website/core.cljs"}
     "here"]
    "."]])

(defn music-component []
  [section-component "Music"
   [:p
    [:a {:href "https://thebirdcagetheater.bandcamp.com/"} "BANDCAMP"]]
   [:p
    [:a {:href "https://www.discogs.com/Bird-Cage-Theater-Finite-CityHurricane-Dirge/release/5431765"}
     "DISCOGS"]
    [:p
     [:a {:href "https://vimeo.com/14313644"} "VIMEO"]]]])

(defn home-page []
  [:div
   [:h1 "Bryan Woods"]
   [online-component]
   [writing-component]
   [programming-component]
   [music-component]])

;; -------------------------
;; Initialize app

(defn mount-root []
  (reagent/render [home-page] (.getElementById js/document "app")))

(defn init! []
  (mount-root))
