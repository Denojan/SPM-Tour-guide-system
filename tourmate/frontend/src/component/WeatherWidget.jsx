import React from 'react';
import { Helmet } from 'react-helmet-async';

function WeatherWidget() {
  return (
    <div>
      {/* Place the OpenWeatherMap widget code here */}
      <div id="openweathermap-widget-11"></div>

      {/* Add the widget's script */}
      <Helmet>
        <script>
          {`
            window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
            window.myWidgetParam.push({
              id: 11,
              cityid: '1227603',
              appid: 'f8358e088ce7977e04d5ef56c9e7c3bb',
              units: 'metric',
              containerid: 'openweathermap-widget-11',
            });
            (function() {
              var script = document.createElement('script');
              script.async = true;
              script.charset = "utf-8";
              script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(script, s);
            })();
          `}
        </script>
      </Helmet>
    </div>
  );
}

export default WeatherWidget;
