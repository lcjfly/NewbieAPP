'use strict';

import React, { Component } from 'react';

import {
  Alert,
  AppRegistry,
  BackAndroid,
  Image,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

var Service = require('./views/service');
var Util = require('./views/util');

var Home = require('./views/Home');
var Favirate = require('./views/Favirate');
var Search = require('./views/Search');
var ChatView = require('./views/ChatView');
var Settings = require('./views/Settings');
var Login = require('./views/Login');

var base64Icon_home_negtive = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAYAAAAeYmHpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAndJREFUeNrsm99NwzAQh1OLd9igbEA3aEYoE5BOQF8RD5QHxCPtBE03SCcgTEDZoCPABOUs/SxdrUCaxm6c5E6ynIT88cfZ8VdXHez3+6hvoaIeRmPQD4+PqS69gQbsnS60PT/38wfnHtMEmVC1sg5PX19e0k5CW8BfqG9Q3xJ41iloAo6pemfAMba3VIZUfvQxAt92YkwT8Igqk0UNNyG4b130No5dUslxbruhAZEDymRzZ/6OzMYMPKNrrloLjcangIn+6r44lmB3iIxftQ4ajc7Zi2r633jFS2zKXm55GzOdWcClUxLOeTbgvuRFecqybuwYu8sqczCdq2Vljd07H+DKA/ACtqVjTRCzqvegaxILfBYsNOTjHrsbNP7UmDGBecO9w4IusK1ajcQcHjPwFT1jEoyRYS7+5LaFRruaBXbWPL9tNNNMPg5sy1UPYhl3Zm2qJvD1f7blENy2trSOvKia3S5jtjXx+WEB955xeTkVXNUAtm3Lm0FZ8sKtLTtnptOqtuUY3Fjb+BR5qfz2Zks9Rj6SqIGo0w5V8UGLEICZtW2YtbmHtmzro0lgFoklL4kz6ALbmgQA/Je1xbXHtLXy4dS2HI5v7QvbY61NVVzqSUIDRsZ3BdZ2XTnTPpz3DBk/6jOAKpEPY1tJ6MDM2qZl1qaOtK0sakkUWFta2r3tSb/oopbEnC1ZHTjFAbQF3LVYmqUrxYDnHQbWcW/k5Sj3xj/kCSYWh0hEbczRnZ+xoupv5aSNIdACLdACLdACLdACLdACLdACLdACLdACLdAC3Xfoi4rnj7DqGGKMfEHr77bGfcl03iKm0rYO5GeHPYlfAQYAtO1UMcoePRsAAAAASUVORK5CYII=';
var base64Icon_home_active = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAYAAAAeYmHpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAz1JREFUeNrsm09rE0EchifT6JISm2CpB/9QsRKpoa0evIiSYMWLBXNQKCgm+AX0Kj20HopH49VLV/ED1A8g7qEHsdFI1UOhoJcgUipY+odYS5x3mSnbuCa7m91kNzsvLJnNTJffw5TM01/bSK1WI2ELJSFMx6AfTk0lcYVtp+fZVQwNNNthlb1k2JXn4+6G5pB5w1sAf9C10AyuIIBHDv8ix3q3xdQTPtdd0BxqDmPATqTekbujC0bwObYm145aIu04pxlMlr28EcCAVaJb+lz1Ty95Vs6SteoBEiFknVWTeTw7+zHQO82AzzGYVxjHenbJZLq0B4xgPDlc1ucYcB97S8PXBBaaF68BBlD3Rt6TQ8rPf9YNxL/rc1jDksBx5uUZTj0ERtEqh9ChAPe/YG5i6Ku4HeQ7ngwMNC9WY9cY7m+lVhoCi6SPfNHX8ozxZwRmp1UjMGCsBmuvnajsgXshL9SDXUaRNzC+fPSHLWCRi4MlcmFgzSgvqm+hWXFFIR8oevzUW8fPun5moR684DtoXtR9YVsoutVcHfpQLy8F30Cb2ZYbwRluYm3ZjhsZP4vLZrblVmBtxcUrZHu3xxVroy4Aa8K2cqlPrgOLHRfy4oa10RaAT3LghLAtK2ex0whr44HwqE7lhToETvLOh25bt89+9hTYCF4vL07AqUPgfbZ1PPGtbT+Tm1jbfDt2uujUttwEh/jwZOzKC7W5y6pRPjoBLALxcWpt1AbwjBHYDfloNagBImTX2qhFYDxsGuPTfRu+ABaBCNm1tqZyUm9bXsiHG/LyYukSqWzFxFvnG8kLtdDqeYpxv7LjS+C9llO6JDovpJm8UKutHvSx/AgsgjZUXctJ4wJlDdpwFrfFtjy0NtNeG20EjPubqeVAANuxtmgj28LRpER3yPLqMNn4rQQCOn6wShLKpl774mq/AMcZnjP99Db5PVM35Tn7RC/s+/Y2tnq6NHnOaK2JwG1sGmJyZ/S1L4leLo2TlfU4ho/Yjs543i4KWiS0hJbQElpCS2gJLaEltISW0BJaQktoCS2hJbSEDjt01M7iymZM7zr6MajNE2j8HRdvs4Zip7UAMTWtNRLG/7X8K8AAQjZg+MiGW1EAAAAASUVORK5CYII=';

var base64Icon_star_negtive = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAYAAAAeYmHpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6tJREFUeNrkmtF52jAQx0Ef79AJ6kxQbwDdIBukbOA+ljzEPKSvZYOQCdoNYiaoM0HEBjABvUtPraraWJLxnQn6Pn3GGFn66X86nSSGh8NhcGlJSVW8uL1NIU8uChrSCnImUfFQwrxB4RlcniDvISdf7+93l6B0TtexhNrsSlsqm8SuthJUeSulNqvSjspzyHh/w622klIZANdSY1sxqzy14QFcw+WRvsu45m0lqLKYJ1dSKpskobYSVllEbcWgclqnspTaHEpnDSqzq606VjmhebhWZQm1lfBYFlFbMansA8ymtmJQeU9r596swBSDyquQmJpD7dGJILFhODUllD9FqmyrfUNq/4D3F3DFztDQKQXbKqsCDD9PrDm4Ki2hkXlkR64ta3ETdmZpOoI+73w7ZFQTMoaAHWvMqqVP0DVtGNP91Gm7V4cMvywW1+QwUnqZT9rE9vKJh1GoKLhxoV/NG16G0N8qwHZur3Fv4gU6T7sjZnT94Px0/mdMQyF0Pg/04BkL9RUwMO4vLAueY5D0jyN7S+AO8J5Yyv/maQoV53SLZlFInUJ0BVwZnJw7eBNwbURWAV7Sy84euDE4ccZ47UvOCbgx9nYUH5Oppz0ERnF++gB7LTj6Dh5jjV6rrL6Cxw6/oGOdkHHTV+Dg9TS9dEaViCleE0R5d37UAZ6k4qeIGqN2TqoUZ5yWWofJ0dtFBJ4zW7YNmMWuC9rukSV0ZTFt2j9z62aHTjmhrXV+L6A1I7Spa8YOTSuvsYDSWlJpe37mhDYzxXtJ6D3z7oq2rG3GDZ0IqGw8+L6NiZ9C6SLSJyQtdmRKaWgdCDuBjIcAL1gWPuctoKPMexSrkuW5tS/s4PehQmaVxesdxdO55xm2XWfKqXRijbHCQ9mcGnpnAS8Hf08n0RM/wO80dYCv0uOYIRILbcxq67EiKh1YBL3Cgz3I+PyjFWUZ+LLBM5c1U2d35m0prY/A5s5c+kgmrB1vjJYyI0gsg+dSuAP7BN9tqEzhlNnBM7PCS0OdaVvowoHFhq8d2A2tiMqGqciGXxH49Ah8Sc8TLqWnttKOSjZsHnqaSb9PHWsx8La1GOhg8w7eOSHP/UK3nyFfO7DPpOxJNhaODBXjGDEinHQNjZDfKx5tA6ed0HpzZ7qz07uQUDjGe6cVsHgEmnQFTGaf0/hdWmFolAcftYB+/RNN7H9KIsFRzZwiuozM20yhRZdKT6i3E05gF57qvqLxnXQ6pt9CUoMLTL8EGACkQzGdNJ492AAAAABJRU5ErkJggg==';
var base64Icon_star_active = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAYAAAAeYmHpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABNxJREFUeNrkm89PE0EUx1+XmgVbWRT5JZrWH+EAEpooiQeVxoM3Ezh48uCPuwlHlUs5EE8m/QOM4sGTB73owUQFTbgQokYl0ShpVfyBUSkWaxWC84YZMixb2M7CzFJestlt+vMz3zdv3nuzDczNzcFGMwM2oGmDvtjT00mO6EZTOsEO5RbQMaeJwnFyesQe7r7c15faCEonClyXptI2lUGH2oYulavNf1BRNqtFbUODyh14fSyShiM7vvCnTquM5IYulVtqX8GBxlEtahu6VEYzg78X1A4AdJHXVJWa0otU5sbVJuG0kjzsLhloJ5W5iWojtAq1DZ0qc2utH+OXlgq1DZ0qc9ti/oD2mu/K1DZ0q8ztaHRUmdqGbpV1qG34QWXVaht+UFm12oZfVFaptuEXlVWqvSqlJYPEHxcTjgiqfL79XtGf9yu/Da4MH+EPn5PjGTlS/EzK0GdKoG1gUXbEmBs62smmt0W5tmh3Xx+G4W/Vy70kLQzEJDkG8OxmQBZBE7AYA4u7BRNtX2UWKoKz0BDKglWRkwZGy89shpdfm8g5CGMZC3IzZTD+u8Lt250GJMUbFYELly4h1B10Rzef1rg5R8H2WBkKZpnTUBOaoDm0CkPXz/yphK/ZKtkBGaRKE4XPkAfXncDM4AzUhSfBKp+iQcbP9i3bAPlZE95PbofcbBA+Z0PwM2/C9/wm/pIMevGCe4vgWOqdax2BmvBnWM+Gg3DtxQEyAGULwDjn7XO6ZMA/ZqJwc3T/EmDH6F0K4K8mWuDWm32LXFqM6kuSE/JkPzmdxWscJXQPdJNSAS6YkXHwAMDUegJ3A7xicoLrNgEfxP6V313dLfCKuTe+iQB3+F1xGzCmrbHlMjNXaaifFXcARoUnPVdZXHF0Gz8pLgNcdJXFcnPMYy1U/FTzS9hppdYVsFRpKYJ7raR0AEvX0zrBH4wdgief6qSBpTsnLDLG2dIgjvqap5ZegT21ixh4kqerKgwrPcG6ZYBXo0dG+1eNoZwSaFtpG5X9HK/QOLehITytLIhhd8YX0PXhX8qghQGOK4dmrVkavbFlpMqqzD9alY7xC5UJCraumEVke+JeoKl7YW9bpWET0mngVUFT99pq5pVCY9dVWCL1QGPHVMawYMF2rowJS6TUvA56gKZ7Vdj7LsYQ9HGqeWH34viucXqzTTF9c4zgb6fC0kpLQYs3urmN3HZYbvc/NJLUsp7ebOMWXojgSt076jZy4/YMFgm4IScA45zoZQdtQCJ8cvgYDKUP0ve4jOCWTASXdW8auXEnZDnYkfFmqiLrPXNYzNeTPG8mP7of5veyT3P4kYlausVbqHKbH+g2Ue0BFdBU6W3lf93CAlM1aS8S2KbaGQKf4PC4DYOV28N0pCA8LpVsu0YZ9HzOHcouKe7xhwp7R2g3EGalW5sF+CTzhg4RvqtpdNFUwqVSgFbi3m3zcyvjGbZQrc72wxMc/uqLNlJs7IV45B2Fx6WSRfCily3ZdtFTvD6xOw1Dn3bYYQdZrevpbgHh++JM+Tax0kKleWAk3xVYa+hOcrrt8NQgU3YA1sDYHhsq77SPXtQ/A4Ky81kVrOD2GOX7C8CjiyuBTjPYfpW5twCP4N2svI0XE8Flk5Oz5MujqoFt8AmmcC9vW63ZnC4F+y/AAHeDuXrOSjrMAAAAAElFTkSuQmCC';

var base64Icon_search_negtive = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAYAAAAeYmHpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+xJREFUeNrsm9Ft2zAQhimh7/YG9gZxJ4g6QbVB1Anq1yIv6kPQxzoTJJkgygRVJqi9gTNB5QncI/BfcSJoyxIpmapDgLCVWNR9vOORPJ6i/X6vLq3E6gLLRUJ/8NXQt9vbKX0sqCZU+bssa6oV1VJ//3F3V50LOnIZ0wQ6p4+Uakb1quXtr1QfqRZDd0AnaMDmVG8s/94IjXJhzev7Zsbvd4DPh4JvBQ0T1rBfDaEL1LJJcLSRon422lnR/Xkw0CTsAmAzKSQErRyGhx4aS6oTYSkptbk9KzQJlwGQBbv3aY6AXwnN6w5NqP31WaAB/CCE0Voo+xDG6Fz9rCU963FQaAO4d7MTw6gU4N41fhAaD/8tgJOhvKsFfOGzs+MjHrYwxtdgcyk0m+DZEyFLr8vQlfDS6TlWTwBf4vKKFJH3Zt7UuO7hX7j8PsS82WDqBby6NzO3aZoh36Dxc5elMPPcu3nDgVwz/Dk3BcLMt6LzU/gbr5rOWMt9zI8OhWWZCBm9QxcBAbO2XwwZ3aFh2hOjZ0MqhfDkU1+aTnhe7mvN6wlaWQIUnaEXIsIRXIFT3RgKcoae47NU4ZbKkNUZeqrCL6Vv6KuQzbvvtXd1SdBenMTYoMegYZ5htr6hFwFDz31Dr0cA7cXZxpbpYIboZFCFZEotCnKDRoRzx1u4ALXMMm1cAwnxgfXtMjAtTwW08w4wPrBvnSFsFErJfO4AY2NRr038DZergLSc4/KprxiZjECGYOa50HLuo0FrsJ9gtcavVQ+B9pZa1kOMI7P3JIcXJcRHxtC/QLuPYFxHs2an9eZLywc1jYdqcD7HeqFeTgcGLsVi5CNWjBmvKVwOEZsO8LQz4wN4HZjL+g4LW4C/4PPB+Kl2aplP82ZvrsfQEy71KUPZ52oNwcn1EeCdmF1u6PeP3qEBrnvzXqx91314dZxV6VPS2RHgBHuDjQt4m/SLTNWzEXR2UO56QI92c1VP60ixo6oBc5TWMgRamXrbRJs5VkTX4s985lWcOrWJXJNM1bONXoSz+mMDPjL2TwbvmlKVqvpxruyAEvvdrdj3apPktKqF5b6a1WD4/FQNmQhdwV2T5xJo5qbD7ZyKtbJokY9nG6fKLuCRryxgdEBiaHUiLGCLuXbdNM/Ckp7ZoTUdJrYFj0JNfSaQ2tTlEzzkLOBETE0P8PLHptbKuOfgdBaFnORuW5110PgncygFne9t0V4bjUuLGY15dwZX9bOuanTQbcFF4p2cFscHfSr4gRTL7Wihm8Db5JRGY3xFyeKhX8ViqDGJNhrre1kWcKVOzBqOxv4yGpa/S+zyTtpbR+9v4L1D/7/lrwADAOs/IYXWjObVAAAAAElFTkSuQmCC';
var base64Icon_search_active = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAYAAAAeYmHpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABJ1JREFUeNrsm01ME0EUgB+gFgED8idYhJqoqCBW0MQYDI0HLx6AxIMnqQe96tVwEA/Eq149SDExMdHEevBC/KmReFEjBUFBIRSpKNBSDH9VCM5bZpph0//OtrPCS4bdLe10vn1v3r5585q2uroKG03SNqE3oTehI8r11lYzOVhIM5FmDvE2B2mjeLzV3j6qS2gKaiWtibSKGD/uIs1O2u1k34C4oAksarSNtAb+9e0ZK2DMXoTSnHlyvrzuM4srW2BiLhu+/c4J1mUn9pcs+JigCWweOdhIa2SvFRj+wuECL9QUu6AoZyKqfsZnTeD8WQafvHnkZmTw/7pD4X1SQFPtojnmMtgzFS6oKu6P+8v9y1nwwX0Y3vwo4eHR7JsIeE9KoQkwztsOdn12jxtOVbwXNgiE7x6rIfC71gYF8JuM6ioBt6UEmgDjF7cw7V449DFqM45V0OwfDFTzWr+kBXhYaF7DxqxFuFjTDYYtC5o6mam5UrAPHQH3wnbNwENCE2B8DD1JJjBv7vd76xVwauoNIud4UGjqpfHxkZtsYF7j9/rqmKk7MfAR5dXTQ7xuY1666UBf0oFR0G+cPzDILo+Sdk0zTdNH0ystvHQ88mLkZMCrE9krIoAJpuk25qlTDYxSX96rRHr82IRCUy0roSUGHjIITq3Tu3+yyxYyRpNoTVuZlhOJtERLnXGA13aTaGilw7riSanWv6jt6nzfOsUIgaamrXjsIyUj0i38Dxb+Cnhy+kgVomkLM+0dBq900GW5blCPVQS04iB2Zy+AjIImjoESFbNQ6NLsOWlzW/mZf9aNVQR0HkgunEKEQWOoB+V50/C/SzpsQOGhcSUDY77CDQXtk32wE/OBTOqoKOhRVcfSiXdpmzbQP+azpATGbAqXQuoRBe3APx7/ViVrIZuMzxpBPdaEocniHDuaxfOvHqN00F+mA4kEZ6JpI/UjC5P58GGyWDrTfjdVwC5top/Tt5mJ909WSQONuyCciIWmadbXeP7SVSGNlnHbh0qniIxoyBwZavut63jKoZ8P1/I7Hm2ahKHUoT3F867vxpR68mHPfn4u3xS1lRsq9rYyT/7w8zHFxJIteLMfD1XyHrtNVN/htnUwO6Hkv1OxrXP3o0WZYmxbhy59rfRoT2R/S8oNPLQuBKbSTEE7VG9Fp2YVDq0G13qrFucwmjS/VUuPge/fafDzJRxxgUu9Kc8D85b2bLCed3Axg8tYfuGkc9ccbmolAh5PoQ1GbS3sNdx5OL5rOqZCGzRjjKVDFdrAWoo34t54vOBJK6maWcqEGb8hqpIq0j9aVCNa05VjjrDOMx7wRIvnTLC2bxxv8Rw+dmzqoIP0iwFSA2r5cm1XxI5iBRddJsm3YOKAKMokSV9oRTfw/ESRB85VdgsFl7IglvoOvEFHtQCXtgpYS3CpS58FgTcTcHs0Cw4phK6dLfTZrYAgUCRR3RhztKssXYOrsj4+3UHHCo7Aj4b2scvZYOklXf2cIdIcDwJsCVZpqLvfcIQCjxZYl9DBwFUSFli30By4XRX/R1Ugr/ufKNH430pDW4dmqyy9y4aE/ifAAGb0r7Hag8SjAAAAAElFTkSuQmCC';

var base64Icon_settings_negtive = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAYAAAAeYmHpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABaFJREFUeNrkW9Fx2zgQpTn6JzsQO5A6EF1BmAqsqyDM313yEeUjk88wFZiuIFIFoSuwVIGpCk6qwAd4HpLNGiQWJEX5bMxgaEkUwId9+7C7kC8eHh6C19bCc0z6z8ePserVqwKt2kr1hQKen2Pyi7HprYDO1eUOL4+qJ1+/fDm8dEuX5O9I9eJF0xt0nuHlLa5X6v30RYLW4gVfNoAz1fd4XbxUSxegs25L+LERstmYojaKkIG+P/HyswK8Ip+t1eXNmKIWjmjlAHTmVM4BeDRRC0ewMhWvnFtSva4J2FFELTwx4D/ESwFc2+4D3feWLe0kbeLwQ91qWKO3eDnuXcLvp2ruFfX7DsGPXuyDGmPrJWR6YnX5RN7SltDg9UAHerWJT5t4tTwwFbW5bbHBHg0ssfQpufVtE7PaQOtB7j0W2QQbJpHI4Mt7NXkitFKCxdTs2OBvAzIm2uBqRzVn3GnLQia0UH2nulm11PMBLtUDVB705AxzLTRl3QoLdqPmXHr7NBGVBQBmnG6EavxqqLbxAWxETY27xPd3DFSFe6oGd4okEZ4LtLbuNaFrwR7wQOi8Hkpdpe5gEcIA7rTtDFqDUit4o/dPDFp0VNQEi5aCCVMmkFss2rpLRAbGZdI4XrJPr0l8PPcFq3oJQfwGZZ6y26Z4XzPqX30/QPi0jFB73Rs0ZH8v3Gu5IN2DJaZgoBX5vRY30j/jfdP0/TX82pfat5KYYiIcVAN/h8FzAeCSgc1bqFsRiubo2mrXmlnqO7nAdRY+0Zw0DDWDRWqSzAPwBplT6fJV/TkCmDlUW7d3arxCQG2zuOvBQEMNd2ySJkobwHqvzHyFCfRMGfC2hTZMEIugT8JRkkwoboh5TVCxaQsOBMAPDHjZMufUN1HpArrJ2gWhWWfADLgZJ2rQkpzszdXgoPEQGzaZTUzyoaofcKsb25xs8b0CI998uiJ7dmLZMnSgP3Q+vLKJKP6OTgoa/rMiFKYtHToUZcK2Y/M82VJ9AqdQCDiFlSMATlkQsGBMGLqZcecsaPqL+HwlBR4KAJuKBgXcFNDXJwJtNCJmLCi7AA8FgK8JpVNXBnNiS88s9DfAj1Lg4f8AMPXlXYPfl7hHBDwUAN4LABthS04EOmY0b9reRMBDB+AdCnQuC28d6jqUpbeCfd0JPHQAToWBhtmqsg65sKQAMZPuDhbgdzxNDQcATEFHbQlJz+Dk2FTSdQAPkKYu/wCNdJD7sDiUxJ5tQtRiKGuDmlfSMlAD8IADnyBfvWLlmy0K76WHYuco+0SwfNoTcEySnKMPaISomYV1Gvjhse6NFV3iJl7D2gOEcwFYzfqma3oJwBXx5bcuajOgURuGJ8X+vgvAKiePvzjwcRXMXxLA79X3i75A6QeuE45OC2CpkemHLtrAQ6VXzNWeAHYA3YEhrawU/xLBsQDfeQEP59Ir9mDmfMqcWCToGQsxHwsRnNLkmIkDLVEuEsX+nX5+YVkAXXpNhdYLHJFdIyvUeHXw+7jHC2hv0BbhsoJmwmQomTCr3iI7q1zFPTWOedhL3zMy2iZBv3aQxNwAUgYj/MrgFOWipph7euoHZTF0fU7QY7aYRYBnt3Tg86sgHOz5hqvxs6B3x2NVLX76YE+fjdWuYyLS5kT4erXJKegnjLRMVvZDfab377wvbcf06VtmiSbr3hHAGuQlKf+8QZLTdkKZuKon57C0xLo80pqzyO0b6L60WD2RVE/GsnTNLY3/0Sgs1k14aInYek4YsxBY/eyWrqlPQ8VLsnfvYbnKUYRIHVZfPCdL/xIyWPcnAfwdhUVRyNhg9XtoQvCcfNqs/IxQ2WldgdUzMCYK5D+mG83SfOW9rNsCfg3x2rD3q+dg6QPJa/MhHooFPxmzev+mU8u+/e8PH1ZDjOOYI1a9GGKsi9f4v5b/CTAAlGvPYN+kNjQAAAAASUVORK5CYII=';
var base64Icon_settings_active = 'data:image/png;base64,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';

var base64Icon_menu_negtive = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAYAAAAeYmHpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAiFJREFUeNrsmtFtwjAQhgHxXjZoOgFhArJBs0FhA14rXtIH1MemE7SdoDBBwwQNG9ANYIL0Tj1HxhAatRAn5j/JsuxEIV9++87irp1lWevSrNO6QAM0oAHtlnXNifvp1KcuonbbcLYVtfhxNns1L7T1kEXAI+peHBOW4QOC3+wpLQor4K2onTYUtEdtJKu1T43VDveUJuiEuqEAe/qXaaoRE8PeyXBATGnuyOhiT4DZJi4AsxEHq/0lw9D03r5279yxPZ1IHxSGLFdU1myNOA1oQAMa0IAGNKABDWhAAxrQgAY0oAENaEADGtCABrTr0JLXcsm8Img9JRs6Bh1In+xAS/5qKXOxK2pLqvZahnliUs9Pc+byU+ZtJOU3Kn9cAoZF8Y/coifl2Rb07HwF55UI/IP0sHHrpxrhitpTxcIsymwtekderrqCv9lSPsBhRyZFKQNqbxZW47wEcEzdR0lgrjUZE1Ngpp/bNmtDCYKVfZfhDb3cuuA+X9TtyxRXF4zo/qSJcVp51tUR4Eh8jQJ+5v38V+CdPW3JQjOcHFF3K+r+uzykY3Fpe4fCiVybGOqyk/NOAWxbaaXyVi1V+RCs7vDU6tZlT++clETdVAM+qbp1UVodHFKtcC8/GBFsfK4fthKyjFC1d5Ao8uRNVzowxmdXtw7QYdXqWoU2QtUDwUZVv0PXksorUddKabUN6KSqvVsr723b8McgoB22bwEGACpiwypeCRkrAAAAAElFTkSuQmCC';
var base64Icon_menu_active = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAYAAAAeYmHpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsRJREFUeNrsm01rE0EYgN+YlZgq/XCpRSOYWEogFrW2ghfpelUE/Qc5+R+kl3goXtM/UJUieFCagif1ELH0oJeK0kJrxGjjBzHpBrQ12BLnHWfTddptCja72en7wmRndwObJ898hXkTqNVqsNdiH+zBIGiCJmi1QnO6cXNkpJMdzvqUy7w9OjrrdDMgT1kM1mCHFCvDPhdaYSWNhX0BpiM0A06ywx3FWvNrVgw7uCYZ5sB66DdcPrkIxzsKENJWfEdZ/HEUXhZ64VVRx9MzrGQQfKuBLG0B3xjIQq++6EtgjO5DX+BKfBquxvLWpWEhdQNaDFr4jXDDfoWVYzAyyyWK2GS6PkqjYZUioZcdoZWNcHCNFicETdAETdAETdAETdAETdAETdAETdAETdAETdAETdAETdDKQ1fX2pQCXP51wKqaMnR91/5dOaYMMAp8W+4EmZFDiw3rKaw/zsX4/q4K8Sx3DlbXg9bpXatizzlJBQAusTe1j78ZhKGe7xDXv7r2AUPBKt9X3qnB4s8jjvcr1YMwsxSBwkrYujTGxH6wTuT0C9yyzbLS4baV890lvpHeKHKlPni4ELcbbBT3GHDScSATGTkIPsZK3k3oaNdyQ7uP5gyYmE/sFBi763UZeJNpt4O1rGvsMMnrF546ZkAsVaJwf67fDovJM8nt0qa2C83jsQahIdK2uiUw2p3+eBpefO6xX77FYFP/81CvoQ18ObWRIvGP3cmFBJSq+3fFbktAi0HzBNb79EIjuzjGpOQkOD+a5pbDwfX6VIXrgwfzA3a7eWE3u5sP1rzuz/2H/8qbyQ/Bk0+Rptn1fPQWeWt8jrp47Bu8N9vtC4mm2G0F04ZVkfrulAA2m/lwzcumbV85CtiMyr+nDclu1C1gT0zbpipX7XrdvNHyc2zize67rQSdYbBpL5eBAfoHHkGrG38EGACGFvnQStaJMAAAAABJRU5ErkJggg==';

var NewbieAPP = React.createClass({

  getInitialState: function() {
    return {
      selectedTab: 'homeTab',
      isIndexShow: true,
      isLoginShow: false,
      isRegShow: false,
      isLoginLoadingShow: false
    };
  },

  componentDidMount: function() {
    var that = this;

    // login with token
    var path = Service.host + Service.loginByToken;
    Util.post(path, {}, function(data) {
      if(data.status) {
        that.setState({
          isIndexShow: true,
          isLoginShow: false,
          isRegShow: false,
          isLoadingShow: false
        });
      } else {
        Alert.alert('登录', data.msg);
        that.setState({
          isIndexShow: false,
          isLoginShow: true,
          isRegShow: false,
          isLoadingShow: false
        });
      }
    });
  },

  _loginSuccess: function() {
    this.setState({
      isLoginShow: false,
      isIndexShow: true,
      selectedTab: 'homeTab',
    });
  },


  _addNavigator: function(component, title) {
    var data = null;

    return <Navigator
      style={{flex: 1}}
      initialRoute={{
        component: component,
        title: title,
        params: {
          state: this
        }
      }}
      renderScene={(route, navigator) => {
        let Component = route.component;
        if(Component) {
          return <View style={{flex: 1, paddingTop: 56}}><Component style={{flex: 1}} state={this} {...route.passProps} navigator={navigator} /></View>
        }
      }}
      navigationBar={
       <Navigator.NavigationBar
          routeMapper={{
            LeftButton: (route, navigator, index, navState) =>
            { 
              if (index === 0) {
                return null;
              }

              BackAndroid.addEventListener('hardwareBackPress', function() {
                   navigator.pop()
                   return true;
              });

              var previousRoute = navState.routeStack[index - 1];
              var title = previousRoute.title;
              return (
                <TouchableOpacity
                  onPress={() => navigator.pop()}
                  style={styles.navBarLeftButton}>
                  <Text style={[styles.navBarText, styles.navBarButtonText]}>
                    {title?'< '+title:''}
                  </Text>
                </TouchableOpacity>
              );
            },
          RightButton: (route, navigator, index, navState) =>
             { return (<Text onPress={route.onFavirateText} style={[styles.navBarText, styles.navBarTitleText]}>{route.favirateText}</Text>); },
          Title: (route, navigator, index, navState) =>
             { return (<View><Text style={[styles.text, styles.navBarText, styles.navBarTitleText]}>{route.title}</Text></View>); },
          
         }}
       />
      }
      configureScene={(route, routeStack) =>
        Navigator.SceneConfigs.PushFromRight}
    />;
  },

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.isIndexShow ?
            <TabNavigator>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'homeTab'}
                title="首页"
                renderIcon={() => <Image source={{uri: base64Icon_home_negtive}} style={{width: 25, height: 25}} />}
                renderSelectedIcon={() => <Image source={{uri: base64Icon_home_active}} style={{width: 25, height: 25}}/>}
                onPress={() => this.setState({ selectedTab: 'homeTab' })}>
                {this._addNavigator(Home, '首页')}
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'favirateTab'}
                title="收藏"
                renderIcon={() => <Image source={{uri: base64Icon_star_negtive}} style={{width: 25, height: 25}}/>}
                renderSelectedIcon={() => <Image source={{uri: base64Icon_star_active}} style={{width: 25, height: 25}}/>}
                onPress={() => this.setState({ selectedTab: 'favirateTab' })}>
                {this._addNavigator(Favirate, '收藏')}
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'searchTab'}
                title="搜索"
                renderIcon={() => <Image source={{uri: base64Icon_search_negtive}} style={{width: 25, height: 25}}/>}
                renderSelectedIcon={() => <Image source={{uri: base64Icon_search_active}} style={{width: 25, height: 25}}/>}
                onPress={() => this.setState({ selectedTab: 'searchTab' })}>
                {this._addNavigator(Search, '搜索')}
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'chatTab'}
                title="消息"
                renderIcon={() => <Image source={{uri: base64Icon_menu_negtive}} style={{width: 25, height: 25}}/>}
                renderSelectedIcon={() => <Image source={{uri: base64Icon_menu_active}} style={{width: 25, height: 25}}/>}
                onPress={() => this.setState({ selectedTab: 'chatTab' })}>
                {this._addNavigator(ChatView, '消息')}
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'settingsTab'}
                title="设置"
                renderIcon={() => <Image source={{uri: base64Icon_settings_negtive}} style={{width: 25, height: 25}} />}
                renderSelectedIcon={() => <Image source={{uri: base64Icon_settings_active}} style={{width: 25, height: 25}} />}
                onPress={() => this.setState({ selectedTab: 'settingsTab' })}>
                {this._addNavigator(Settings, '设置')}
              </TabNavigator.Item>
            </TabNavigator>
          :null
        }
        {this.state.isLoginShow ?
            <Login loginSuccess={this._loginSuccess} />:null
        }
      </View>
    );
  }

});

const styles = StyleSheet.create({
    
    content: {
        flex: 1,
    },
    text: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000'
    },
    navBarText: {
      fontSize: 16,
      marginVertical: 19,
      color: '#000',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    navBarTitleText: {
      marginVertical: 19,
    },
    navBarLeftButton: {
      paddingLeft: 10,
    },
    navBarRightButton: {
      paddingRight: 10,
    },
    navBarButtonText: {
    },
});

AppRegistry.registerComponent('NewbieAPP', () => NewbieAPP);
