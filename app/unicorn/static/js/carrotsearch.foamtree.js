/**
 * Carrot Search FoamTree HTML5 (demo variant)
 * v3.2.0, 200c52688b5d0fff5e0a6eaac8db8c20676095d1/200c5268, build [unset], Jul 21, 2014
 *
 * Carrot Search confidential.
 * Copyright 2002-2014, Carrot Search s.c, All Rights Reserved.
 */
(function() {
    var w = function() {
        var a = window.navigator.userAgent,
            l;
        try {
            window.localStorage.setItem("ftap5caavc", "ftap5caavc"), window.localStorage.removeItem("ftap5caavc"), l = !0
        } catch (h) {
            l = !1
        }
        return {
            Le: function() {
                return /webkit/i.test(a)
            },
            Je: function() {
                return /Mac/.test(a)
            },
            Ie: function() {
                return /iPad|iPod|iPhone/.test(a)
            },
            He: function() {
                return /Android/.test(a)
            },
            Fe: function() {
                return "ontouchstart" in window || !! window.DocumentTouch && document instanceof window.DocumentTouch
            },
            wh: function() {
                return l
            }
        }
    }();
    var F = function() {
        function a() {
            return window.performance && (window.performance.now || window.performance.mozNow || window.performance.msNow || window.performance.oNow || window.performance.webkitNow) || Date.now
        }
        var l = a();
        return {
            create: function() {
                return {
                    now: function() {
                        var h = a();
                        return function() {
                            return h.call(window.performance)
                        }
                    }()
                }
            },
            now: function() {
                return l.call(window.performance)
            }
        }
    }();

    function aa() {
        function a() {
            if (!d) throw "AF0";
            var a = F.now();
            0 !== g && (h.rd = a - g);
            g = a;
            c = c.filter(function(a) {
                return null !== a
            });
            h.frames++;
            for (var f = 0; f < c.length; f++) {
                var b = c[f];
                null !== b && (!0 === b.be.call(b.rg) ? c[f] = null : G.md(b.repeat) && (b.repeat = b.repeat - 1, 0 >= b.repeat && (c[f] = null)))
            }
            c = c.filter(function(a) {
                return null !== a
            });
            d = !1;
            l();
            a = F.now() - a;
            0 !== a && (h.qd = a);
            h.totalTime += a;
            h.ne = 1E3 * h.frames / h.totalTime;
            g = 0 === c.length ? 0 : F.now()
        }

        function l() {
            0 < c.length && !d && (d = !0, e(a))
        }
        var h = this.Nf = {
            frames: 0,
            totalTime: 0,
            qd: 0,
            rd: 0,
            ne: 0
        };
        ca = h;
        var e = function() {
            return w.Ie() ? function(a) {
                window.setTimeout(a, 0)
            } : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function() {
                var a = F.create();
                return function(d) {
                    var b = 0;
                    window.setTimeout(function() {
                        var c = a.now();
                        d();
                        b = a.now() - c
                    }, 16 > b ? 16 - b : 0)
                }
            }()
        }(),
            c = [],
            d = !1,
            g = 0;
        this.repeat = function(a, d, b) {
            this.cancel(a);
            c.push({
                be: a,
                rg: b,
                repeat: d
            });
            l()
        };
        this.c = function(a, d) {
            this.repeat(a,
                1, d)
        };
        this.cancel = function(a) {
            for (var d = 0; d < c.length; d++) {
                var b = c[d];
                null !== b && b.be === a && (c[d] = null)
            }
        };
        this.k = function() {
            c = []
        }
    }
    var ca;
    var da = function() {
        function a() {
            this.buffer = [];
            this.ga = 0
        }

        function l(a) {
            return function() {
                var c, h = this.buffer,
                    f = this.ga;
                h[f++] = "call";
                h[f++] = a;
                h[f++] = arguments.length;
                for (c = 0; c < arguments.length; c++) h[f++] = arguments[c];
                this.ga = f
            }
        }

        function h(a) {
            return function() {
                return c[a].apply(c, arguments)
            }
        }
        var e = document.createElement("canvas");
        e.width = 1;
        e.height = 1;
        var c = e.getContext("2d");
        a.prototype.clear = function() {
            this.ga = 0
        };
        a.prototype.Ia = function() {
            return 0 === this.ga
        };
        a.prototype.Na = function(a) {
            function c(a,
                b, d) {
                for (var h = 0, e = a.ga, g = a.buffer; h < d;) g[e++] = b[h++];
                a.ga = e
            }

            function h(a, b, d, c) {
                for (var e = 0; e < d;) switch (b[e++]) {
                    case "set":
                        a[b[e++]] = b[e++];
                        break;
                    case "setGlobalAlpha":
                        a[b[e++]] = b[e++] * c;
                        break;
                    case "call":
                        var g = b[e++];
                        switch (b[e++]) {
                            case 0:
                                a[g]();
                                break;
                            case 1:
                                a[g](b[e++]);
                                break;
                            case 2:
                                a[g](b[e++], b[e++]);
                                break;
                            case 3:
                                a[g](b[e++], b[e++], b[e++]);
                                break;
                            case 4:
                                a[g](b[e++], b[e++], b[e++], b[e++]);
                                break;
                            case 5:
                                a[g](b[e++], b[e++], b[e++], b[e++], b[e++]);
                                break;
                            case 6:
                                a[g](b[e++], b[e++], b[e++], b[e++], b[e++],
                                    b[e++]);
                                break;
                            case 7:
                                a[g](b[e++], b[e++], b[e++], b[e++], b[e++], b[e++], b[e++]);
                                break;
                            case 8:
                                a[g](b[e++], b[e++], b[e++], b[e++], b[e++], b[e++], b[e++], b[e++]);
                                break;
                            case 9:
                                a[g](b[e++], b[e++], b[e++], b[e++], b[e++], b[e++], b[e++], b[e++], b[e++]);
                                break;
                            default:
                                throw "CB0";
                        }
                }
            }
            a instanceof da ? c(a, this.buffer, this.ga) : h(a, this.buffer, this.ga, G.F(a.globalAlpha, 1))
        };
        a.prototype.replay = a.prototype.Na;
        a.prototype.c = function() {
            return new a
        };
        a.prototype.scratch = a.prototype.c;
        "arc arcTo beginPath bezierCurveTo clearRect clip closePath drawImage fill fillRect fillText lineTo moveTo putImageData quadraticCurveTo rect rotate scale setLineDash setTransform stroke strokeRect strokeText transform translate".split(" ").forEach(function(d) {
            a.prototype[d] =
                l(d)
        });
        ["measureText", "createLinearGradient", "createRadialGradient", "createPattern", "getLineDash"].forEach(function(d) {
            a.prototype[d] = h(d)
        });
        ["save", "restore"].forEach(function(d) {
            a.prototype[d] = function(a, d) {
                return function() {
                    a.apply(this, arguments);
                    d.apply(this, arguments)
                }
            }(l(d), h(d))
        });
        ["font"].forEach(function(d) {
            Object.defineProperty(a.prototype, d, {
                set: function(a) {
                    c[d] = a;
                    var e = this.buffer;
                    e[this.ga++] = "set";
                    e[this.ga++] = d;
                    e[this.ga++] = a
                }
            })
        });
        "fillStyle globalAlpha globalCompositeOperation lineCap lineDashOffset lineJoin lineWidth miterLimit shadowBlur shadowColor shadowOffsetX shadowOffsetY strokeStyle textAlign textBaseline".split(" ").forEach(function(d) {
            Object.defineProperty(a.prototype,
                d, {
                    set: function(a) {
                        var c = this.buffer;
                        c[this.ga++] = "globalAlpha" === d ? "setGlobalAlpha" : "set";
                        c[this.ga++] = d;
                        c[this.ga++] = a
                    }
                })
        });
        a.prototype.roundRect = function(a, c, e, f, b) {
            this.beginPath();
            this.moveTo(a + b, c);
            this.lineTo(a + e - b, c);
            this.quadraticCurveTo(a + e, c, a + e, c + b);
            this.lineTo(a + e, c + f - b);
            this.quadraticCurveTo(a + e, c + f, a + e - b, c + f);
            this.lineTo(a + b, c + f);
            this.quadraticCurveTo(a, c + f, a, c + f - b);
            this.lineTo(a, c + b);
            this.quadraticCurveTo(a, c, a + b, c);
            this.closePath()
        };
        a.prototype.fillPolygonWithText = function(a, c, e,
            f, b) {
            b || (b = {});
            var k = {
                bc: G.F(b.maxFontSize, J.Pa.bc),
                Jc: G.F(b.minFontSize, J.Pa.Jc),
                lineHeight: G.F(b.lineHeight, J.Pa.lineHeight),
                Vb: G.F(b.horizontalPadding, J.Pa.Vb),
                Jb: G.F(b.verticalPadding, J.Pa.Jb),
                cc: G.F(b.maxTotalTextHeight, J.Pa.cc),
                fontFamily: G.F(b.fontFamily, J.Pa.fontFamily),
                verticalAlign: G.F(b.verticalAlign, J.Pa.verticalAlign)
            }, h = b.cache;
            if (h && G.N(b, "area")) {
                h.Tc || (h.Tc = new da);
                var q = b.area,
                    p = G.F(b.cacheInvalidationThreshold, 0.05);
                a = J.ae(k, this, f, a, U.A(a, {}), {
                    x: c,
                    y: e
                }, b.allowForcedSplit || !1, b.allowEllipsis || !1, h, q, p, b.invalidateCache)
            } else a = J.le(k, this, f, a, U.A(a, {}), {
                x: c,
                y: e
            }, b.allowForcedSplit || !1, b.allowEllipsis || !1);
            return a.ka ? {
                fit: !0,
                lineCount: a.$b,
                fontSize: a.fontSize,
                box: {
                    x: a.X.x,
                    y: a.X.y,
                    w: a.X.f,
                    h: a.X.j
                },
                ellipsis: a.Pb
            } : {
                fit: !1
            }
        };
        return a
    }();
    var fa = function() {
        function a(a) {
            this.P = a;
            this.c = [];
            this.yb = [void 0];
            this.Ac = ["#SIZE#px sans-serif"];
            this.sd = [0];
            this.td = [1];
            this.Pd = [0];
            this.Qd = [0];
            this.Rd = [0];
            this.yd = [10];
            this.Sb = [10];
            this.Hb = [this.yb, this.Ac, this.Sb, this.sd, this.td, this.Pd, this.yd, this.Qd, this.Rd];
            this.oa = [1, 0, 0, 1, 0, 0]
        }

        function l(a) {
            var d = a.P,
                c = a.Hb[0].length - 1;
            a.yb[c] && (d.setLineDash(a.yb[c]), d.fj = a.sd[c]);
            d.miterLimit = a.yd[c];
            d.lineWidth = a.td[c];
            d.shadowBlur = a.Pd[c];
            d.shadowOffsetX = a.Qd[c];
            d.shadowOffsetY = a.Rd[c];
            d.font = a.Ac[c].replace("#SIZE#",
                a.Sb[c].toString())
        }

        function h(a) {
            return function() {
                return this.P[a].apply(this.P, arguments)
            }
        }

        function e(a) {
            return function(c, f) {
                var e = this.oa;
                return this.P[a].call(this.P, d(c, f, e), g(c, f, e))
            }
        }

        function c(a) {
            return function(c, f, e, h) {
                var m = this.oa;
                return this.P[a].call(this.P, d(c, f, m), g(c, f, m), e * m[0], h * m[3])
            }
        }

        function d(a, d, c) {
            return a * c[0] + d * c[2] + c[4]
        }

        function g(a, d, c) {
            return a * c[1] + d * c[3] + c[5]
        }

        function m(a, c) {
            for (var d = 0; d < a.length; d++) a[d] *= c[0];
            return a
        }
        a.prototype.save = function() {
            this.c.push(this.oa.slice(0));
            for (var a = 0; a < this.Hb.length; a++) {
                var d = this.Hb[a];
                d.push(d[d.length - 1])
            }
            this.P.save()
        };
        a.prototype.restore = function() {
            this.oa = this.c.pop();
            for (var a = 0; a < this.Hb.length; a++) this.Hb[a].pop();
            this.P.restore();
            l(this)
        };
        a.prototype.scale = function(a, d) {
            var c = this.oa;
            c[0] *= a;
            c[1] *= a;
            c[2] *= d;
            c[3] *= d;
            var c = this.oa,
                f = this.Hb,
                e = f[0].length - 1,
                h = this.yb[e];
            h && m(h, c);
            for (h = 2; h < f.length; h++) {
                var g = f[h];
                g[e] *= c[0]
            }
            l(this)
        };
        a.prototype.translate = function(a, c) {
            var d = this.oa;
            d[4] += d[0] * a + d[2] * c;
            d[5] += d[1] * a + d[3] * c
        };
        ["moveTo", "lineTo"].forEach(function(b) {
            a.prototype[b] = e(b)
        });
        ["clearRect", "fillRect", "strokeRect", "rect"].forEach(function(b) {
            a.prototype[b] = c(b)
        });
        "fill stroke beginPath closePath clip createImageData createPattern getImageData putImageData getLineDash setLineDash".split(" ").forEach(function(b) {
            a.prototype[b] = h(b)
        });
        [{
            lb: "lineDashOffset",
            pb: function(a) {
                return a.sd
            }
        }, {
            lb: "lineWidth",
            pb: function(a) {
                return a.td
            }
        }, {
            lb: "miterLimit",
            pb: function(a) {
                return a.yd
            }
        }, {
            lb: "shadowBlur",
            pb: function(a) {
                return a.Pd
            }
        }, {
            lb: "shadowOffsetX",
            pb: function(a) {
                return a.Qd
            }
        }, {
            lb: "shadowOffsetY",
            pb: function(a) {
                return a.Rd
            }
        }].forEach(function(b) {
            Object.defineProperty(a.prototype, b.lb, {
                set: function(a) {
                    var d = b.pb(this);
                    a *= this.oa[0];
                    d[d.length - 1] = a;
                    this.P[b.lb] = a
                }
            })
        });
        var f = /(\d+(?:\.\d+)?)px/;
        Object.defineProperty(a.prototype, "font", {
            set: function(a) {
                var d = f.exec(a);
                if (1 < d.length) {
                    var c = this.Sb.length - 1;
                    this.Sb[c] = parseFloat(d[1]);
                    this.Ac[c] = a.replace(f, "#SIZE#px");
                    this.P.font = this.Ac[c].replace("#SIZE#", (this.Sb[c] * this.oa[0]).toString())
                }
            }
        });
        "fillStyle globalAlpha globalCompositeOperation lineCap lineJoin shadowColor strokeStyle textAlign textBaseline".split(" ").forEach(function(b) {
            Object.defineProperty(a.prototype, b, {
                set: function(a) {
                    this.P[b] = a
                }
            })
        });
        a.prototype.bezierCurveTo = function(a, c, f, e, h, m) {
            var s = this.oa;
            this.P.bezierCurveTo(d(a, c, s), g(a, c, s), d(f, e, s), g(f, e, s), d(h, m, s), g(h, m, s))
        };
        a.prototype.drawImage = function(a, c, f, e, h, m, s, v, l) {
            var x = this.oa;
            a = [a];
            a.push(d(c, f, x));
            a.push(g(c, f, x));
            G.R(e) || (a.push(e * x[0]), a.push(h * x[3]));
            G.R(m) ||
                (a.push(d(m, s, x)), a.push(g(m, s, x)), a.push(v * x[0]), a.push(l * x[3]));
            this.P.drawImage.apply(this.P, a)
        };
        a.prototype.quadraticCurveTo = function(a, c, f, e) {
            var h = this.oa;
            this.P.quadraticCurveTo(d(a, c, h), g(a, c, h), d(f, e, h), g(f, e, h))
        };
        a.prototype.fillText = function(a, c, f, e) {
            var h = this.oa;
            this.P.fillText(a, d(c, f, h), g(c, f, h), G.md(e) ? e * h[0] : 1E20)
        };
        a.prototype.setLineDash = function(a) {
            a = m(a.slice(0), this.oa);
            this.yb[this.yb.length - 1] = a;
            this.P.setLineDash(a)
        };
        return a
    }();
    var ha = function() {
        var a = !w.Le() || w.Ie() || w.He() ? 1 : 7;
        return {
            wg: function() {
                function l(a) {
                    a.beginPath();
                    ga.Sd(a, m)
                }
                var h = document.createElement("canvas");
                h.width = 800;
                h.height = 600;
                var e = h.getContext("2d"),
                    c = h.width,
                    h = h.height,
                    d, g = 0,
                    m = [{
                        x: 0,
                        y: 100
                    }];
                for (d = 1; 6 >= d; d++) g = 2 * d * Math.PI / 6, m.push({
                    x: 0 + 100 * Math.sin(g),
                    y: 0 + 100 * Math.cos(g)
                });
                d = {
                    polygonPlainFill: [l,
                        function(a) {
                            a.fillStyle = "rgb(255, 0, 0)";
                            a.fill()
                        }
                    ],
                    polygonPlainStroke: [l,
                        function(a) {
                            a.strokeStyle = "rgb(128, 0, 0)";
                            a.lineWidth = 2;
                            a.closePath();
                            a.stroke()
                        }
                    ],
                    polygonGradientFill: [l,
                        function(a) {
                            var b = a.createRadialGradient(0, 0, 10, 0, 0, 60);
                            b.addColorStop(0, "rgb(255, 0, 0)");
                            b.addColorStop(1, "rgb(255, 255, 0)");
                            a.fillStyle = b;
                            a.fill()
                        }
                    ],
                    polygonGradientStroke: [l,
                        function(a) {
                            var b = a.createLinearGradient(-100, -100, 100, 100);
                            b.addColorStop(0, "rgb(224, 0, 0)");
                            b.addColorStop(1, "rgb(32, 0, 0)");
                            a.strokeStyle = b;
                            a.lineWidth = 2;
                            a.closePath();
                            a.stroke()
                        }
                    ],
                    polygonExposureShadow: [l,
                        function(a) {
                            a.shadowBlur = 50;
                            a.shadowColor = "rgba(0, 0, 0, 1)";
                            a.fillStyle = "rgba(0, 0, 0, 1)";
                            a.globalCompositeOperation = "source-over";
                            a.fill();
                            a.shadowBlur = 0;
                            a.shadowColor = "transparent";
                            a.globalCompositeOperation = "destination-out";
                            a.fill()
                        }
                    ],
                    labelPlainFill: [
                        function(a) {
                            a.fillStyle = "#000";
                            a.font = "24px sans-serif";
                            a.textAlign = "center"
                        },
                        function(a) {
                            a.fillText("Some text", 0, -16);
                            a.fillText("for testing purposes", 0, 16)
                        }
                    ]
                };
                var g = 100 / Object.keys(d).length,
                    f = F.now(),
                    b = {}, k;
                for (k in d) {
                    var n = d[k],
                        q = F.now(),
                        p, r = 0;
                    do {
                        e.save();
                        e.translate(Math.random() * c, Math.random() * h);
                        p = 3 * Math.random() + 0.5;
                        e.scale(p,
                            p);
                        for (p = 0; p < n.length; p++) n[p](e);
                        e.restore();
                        r++;
                        p = F.now()
                    } while (p - q < g);
                    b[k] = a * (p - q) / r
                }
                b.total = F.now() - f;
                return b
            }
        }
    }();
    var ga = {
        Sd: function(a, l) {
            var h = l[0];
            a.moveTo(h.x, h.y);
            for (var e = l.length - 1; 0 < e; e--) h = l[e], a.lineTo(h.x, h.y)
        },
        Fi: function(a, l, h, e) {
            var c, d, g, m = [],
                f = 0,
                b = 0;
            for (g = 0; g < l.length; g++) c = l[g], d = l[(g + 1) % l.length], c = U.c(c, d), 9 < c ? (c = Math.sqrt(c), m.push(c), f += c, b++) : m.push(0);
            h = e * (h + 0.5 * e * f / b);
            e = [];
            f = [];
            c = h / 3;
            for (g = 0; g < l.length; g++) d = m[g], d > c && (e.push(l[g]), f.push(d));
            l = e.length;
            if (3 > l) return !1;
            var k, n, m = {}, b = {}, q = {}, p = 0;
            for (g = 0; g < l; g++) c = e[g], d = e[(g + 1) % l], k = e[(g + 2) % l], n = f[(g + 1) % l], n = Math.min(0.5, h / n), U.Ka(1 -
                n, d, k, b), U.Ka(n, d, k, q), p++, 0 == g && (k = Math.min(0.5, h / f[0]), U.Ka(k, c, d, m), p++, a.moveTo(m.x, m.y)), a.quadraticCurveTo(d.x, d.y, b.x, b.y), a.lineTo(q.x, q.y);
            return !0
        }
    };

    function ma(a) {
        function l(a) {
            b[a].style.opacity = n * k[a]
        }

        function h(a) {
            a.width = Math.round(c * a.q);
            a.height = Math.round(d * a.q)
        }
        var e, c, d, g, m, f = [],
            b = {}, k = {}, n = 0;
        this.u = function(b) {
            e = b;
            /relative|absolute|fixed/.test(window.getComputedStyle(e, null).getPropertyValue("position")) || (e.style.position = "relative");
            0 != e.clientWidth && 0 != e.clientHeight || na.va("element has zero dimensions: " + e.clientWidth + " x " + e.clientHeight + ".");
            e.innerHTML = "";
            c = e.clientWidth;
            d = e.clientHeight;
            g = 0 !== c ? c : void 0;
            m = 0 !== d ? d : void 0;
            "embedded" ===
                e.getAttribute("data-foamtree") && na.va("visualization already embedded in the element.");
            e.setAttribute("data-foamtree", "embedded");
            a.d.p("stage:initialized", this, e, c, d)
        };
        this.fb = function() {
            e.removeAttribute("data-foamtree");
            f = [];
            b = {};
            a.d.p("stage:disposed", this, e)
        };
        this.k = function() {
            c = e.clientWidth;
            d = e.clientHeight;
            if (0 !== c && 0 !== d && (c !== g || d !== m)) {
                for (var b = f.length - 1; 0 <= b; b--) h(f[b]);
                a.d.p("stage:resized", g, m, c, d);
                g = c;
                m = d
            }
        };
        this.ui = function(a, b) {
            a.q = b;
            h(a)
        };
        this.dc = function(c, d, g) {
            var s = document.createElement("canvas");
            s.setAttribute("style", "position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;");
            s.q = d;
            h(s);
            f.push(s);
            b[c] = s;
            k[c] = 1;
            l(c);
            g || e.appendChild(s);
            a.d.p("stage:newLayer", c, s);
            return s
        };
        this.Zb = function(a, b) {
            G.R(b) || (k[a] = b, l(a));
            return k[a]
        };
        this.c = function(a) {
            G.R(a) || (n = a, G.Ca(b, function(a, b) {
                l(b)
            }));
            return n
        }
    };

    function oa(a) {
        function l(a, b, f) {
            x = !0;
            q.x = 0;
            q.y = 0;
            p.x = 0;
            p.y = 0;
            c = k;
            d.x = n.x;
            d.y = n.y;
            b();
            g *= a;
            m = f ? g / c : a;
            m = Math.max(0.25 / c, m);
            return !0
        }

        function h(a, b) {
            b.x = a.x / k + n.x;
            b.y = a.y / k + n.y;
            return b
        }

        function e(a, b, c, d, f, e, h, k, g) {
            var s = (a - c) * (e - k) - (b - d) * (f - h);
            if (1E-5 > Math.abs(s)) return !1;
            g.x = ((a * d - b * c) * (f - h) - (a - c) * (f * k - e * h)) / s;
            g.y = ((a * d - b * c) * (e - k) - (b - d) * (f * k - e * h)) / s;
            return !0
        }
        var c = 1,
            d = {
                x: 0,
                y: 0
            }, g = 1,
            m = 1,
            f = 1,
            b = {
                x: 0,
                y: 0
            }, k = 1,
            n = {
                x: 0,
                y: 0
            }, q = {
                x: 0,
                y: 0
            }, p = {
                x: 0,
                y: 0
            }, r, s, v = {
                x: 0,
                y: 0,
                f: 0,
                j: 0
            }, t = {
                x: 0,
                y: 0,
                f: 0,
                j: 0,
                scale: 1
            }, x = !0;
        a.d.i("stage:initialized", function(a, b, c, d) {
            r = c;
            s = d;
            v.x = 0;
            v.y = 0;
            v.f = c;
            v.j = d;
            t.x = 0;
            t.y = 0;
            t.f = c;
            t.j = d;
            t.scale = 1
        });
        a.d.i("stage:resized", function(a, c, f, e) {
            function h(a) {
                a.x *= g;
                a.y *= m
            }

            function k(a) {
                h(a);
                a.f *= g;
                a.j *= m
            }
            r = f;
            s = e;
            var g = f / a,
                m = e / c;
            h(d);
            h(n);
            h(b);
            h(q);
            h(p);
            k(v);
            k(t)
        });
        this.Kb = function(a, c) {
            return l(c, function() {
                h(a, b)
            }, !0)
        };
        this.J = function(a, c) {
            if (1 === Math.round(1E4 * c) / 1E4) {
                var d = v.x - n.x,
                    f = v.y - n.y;
                l(1, function() {}, !0);
                return this.c(-d, -f)
            }
            return l(c, function() {
                for (var c = !1; !c;) var c = Math.random(),
                d = Math.random(), f = Math.random(), h = Math.random(), c = e(a.x + c * a.f, a.y + d * a.j, v.x + c * v.f, v.y + d * v.j, a.x + f * a.f, a.y + h * a.j, v.x + f * v.f, v.y + h * v.j, b)
            }, !0)
        };
        this.gc = function(a, c) {
            var d, f, h, g;
            d = a.f / a.j;
            f = r / s;
            d < f ? (h = a.j * f, g = a.j, d = a.x - 0.5 * (h - a.f), f = a.y) : d > f ? (h = a.f, g = a.f * s / r, d = a.x, f = a.y - 0.5 * (g - a.j)) : (d = a.x, f = a.y, h = a.f, g = a.j);
            d -= h * c;
            f -= g * c;
            h *= 1 + 2 * c;
            if (e(d, f, n.x, n.y, d + h, f, n.x + r / k, n.y, b)) return l(r / k / h, G.La, !1);
            x = !1;
            return this.c(k * (n.x - d), k * (n.y - f))
        };
        this.c = function(a, b) {
            var c = Math.round(1E4 * a) / 1E4,
                d = Math.round(1E4 * b) /
                    1E4;
            p.x += c / k;
            p.y += d / k;
            return 0 !== c || 0 !== d
        };
        this.reset = function(a) {
            a && this.content(0, 0, r, s);
            return this.J({
                x: v.x + n.x,
                y: v.y + n.y,
                f: v.f / k,
                j: v.j / k
            }, f / g)
        };
        this.Eb = function(a) {
            f = Math.min(1, Math.round(1E4 * (a || g)) / 1E4)
        };
        this.k = function() {
            return n.x < v.x ? (v.x - n.x) * k : n.x + r / k > v.x + v.f ? -(n.x + r / k - v.x - v.f) * k : 0
        };
        this.o = function() {
            return n.y < v.y ? (v.y - n.y) * k : n.y + s / k > v.y + v.j ? -(n.y + s / k - v.y - v.j) * k : 0
        };
        this.update = function(a) {
            var f = Math.abs(Math.log(m));
            6 > f ? f = 2 : (f /= 4, f += 3 * f * (1 < m ? a : 1 - a));
            f = 1 < m ? Math.pow(a, f) : 1 - Math.pow(1 - a,
                f);
            f = (x ? f : 1) * (m - 1) + 1;
            k = c * f;
            n.x = b.x - (b.x - d.x) / f;
            n.y = b.y - (b.y - d.y) / f;
            n.x -= q.x * (1 - a) + p.x * a;
            n.y -= q.y * (1 - a) + p.y * a;
            1 === a && (q.x = p.x, q.y = p.y);
            t.x = n.x;
            t.y = n.y;
            t.f = r / k;
            t.j = s / k;
            t.scale = k
        };
        this.absolute = function(a, b) {
            return h(a, b || {})
        };
        this.Xd = function(a, b) {
            var c = b || {};
            c.x = (a.x - n.x) * k;
            c.y = (a.y - n.y) * k;
            return c
        };
        this.vc = function(a) {
            return this.scale() < f / a
        };
        this.zd = function() {
            return G.kd(k, 1)
        };
        this.scale = function() {
            return Math.round(1E4 * k) / 1E4
        };
        this.content = function(a, b, c, d) {
            v.x = a;
            v.y = b;
            v.f = c;
            v.j = d
        };
        this.wc = function(a,
            b) {
            var c;
            for (c = a.length - 1; 0 <= c; c--) {
                var d = a[c];
                d.save();
                d.scale(k, k);
                d.translate(-n.x, -n.y)
            }
            b(t);
            for (c = a.length - 1; 0 <= c; c--) d = a[c], d.restore()
        }
    };
    var V = new function() {
            function a(a) {
                if ("hsl" == a.model || "hsla" == a.model) return a;
                var e = a.r /= 255,
                    c = a.g /= 255,
                    d = a.b /= 255,
                    g = Math.max(e, c, d),
                    m = Math.min(e, c, d),
                    f, b = (g + m) / 2;
                if (g == m) f = m = 0;
                else {
                    var k = g - m,
                        m = 0.5 < b ? k / (2 - g - m) : k / (g + m);
                    switch (g) {
                        case e:
                            f = (c - d) / k + (c < d ? 6 : 0);
                            break;
                        case c:
                            f = (d - e) / k + 2;
                            break;
                        case d:
                            f = (e - c) / k + 4
                    }
                    f /= 6
                }
                a.h = 360 * f;
                a.s = 100 * m;
                a.l = 100 * b;
                a.model = "hsl";
                return a
            }
            var l = {
                h: 0,
                s: 0,
                l: 0,
                a: 1,
                model: "hsla"
            };
            this.za = function(h) {
                return G.Fc(h) ? a(V.bg(h)) : G.Xb(h) ? a(h) : l
            };
            this.bg = function(a) {
                var e;
                return (e = /rgba\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)/.exec(a)) &&
                    5 == e.length ? {
                        r: parseFloat(e[1]),
                        g: parseFloat(e[2]),
                        b: parseFloat(e[3]),
                        a: parseFloat(e[4]),
                        model: "rgba"
                } : (e = /hsla\(\s*([^,\s]+)\s*,\s*([^,%\s]+)%\s*,\s*([^,\s%]+)%\s*,\s*([^,\s]+)\s*\)/.exec(a)) && 5 == e.length ? {
                    h: parseFloat(e[1]),
                    s: parseFloat(e[2]),
                    l: parseFloat(e[3]),
                    a: parseFloat(e[4]),
                    model: "hsla"
                } : (e = /rgb\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)/.exec(a)) && 4 == e.length ? {
                    r: parseFloat(e[1]),
                    g: parseFloat(e[2]),
                    b: parseFloat(e[3]),
                    a: 1,
                    model: "rgb"
                } : (e = /hsl\(\s*([^,\s]+)\s*,\s*([^,\s%]+)%\s*,\s*([^,\s%]+)%\s*\)/.exec(a)) &&
                    4 == e.length ? {
                        h: parseFloat(e[1]),
                        s: parseFloat(e[2]),
                        l: parseFloat(e[3]),
                        a: 1,
                        model: "hsl"
                } : (e = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(a)) && 4 == e.length ? {
                    r: parseInt(e[1], 16),
                    g: parseInt(e[2], 16),
                    b: parseInt(e[3], 16),
                    a: 1,
                    model: "rgb"
                } : (e = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(a)) && 4 == e.length ? {
                    r: 17 * parseInt(e[1], 16),
                    g: 17 * parseInt(e[2], 16),
                    b: 17 * parseInt(e[3], 16),
                    a: 1,
                    model: "rgb"
                } : l
            };
            this.Xf = function(a) {
                function e(a, b, c) {
                    0 > c && (c += 1);
                    1 < c && (c -= 1);
                    return c < 1 / 6 ? a + 6 * (b - a) * c : 0.5 > c ? b : c < 2 / 3 ?
                        a + (b - a) * (2 / 3 - c) * 6 : a
                }
                if ("rgb" == a.model || "rgba" == a.model) return Math.sqrt(a.r * a.r * 0.241 + a.g * a.g * 0.691 + a.b * a.b * 0.068) / 255;
                var c, d;
                c = a.l / 100;
                var g = a.s / 100;
                d = a.h / 360;
                if (0 == a.ij) c = a = d = c;
                else {
                    var g = 0.5 > c ? c * (1 + g) : c + g - c * g,
                        m = 2 * c - g;
                    c = e(m, g, d + 1 / 3);
                    a = e(m, g, d);
                    d = e(m, g, d - 1 / 3)
                }
                return Math.sqrt(65025 * c * c * 0.241 + 65025 * a * a * 0.691 + 65025 * d * d * 0.068) / 255
            };
            this.jg = function(a) {
                if (G.Fc(a)) return a;
                if (G.Xb(a)) switch (a.model) {
                    case "hsla":
                        return V.cg(a);
                    case "hsl":
                        return V.rc(a);
                    case "rgba":
                        return V.fg(a);
                    case "rgb":
                        return V.eg(a);
                    default:
                        return "#000"
                } else return "#000"
            };
            this.fg = function(a) {
                return "rgba(" + (0.5 + a.r | 0) + "," + (0.5 + a.g | 0) + "," + (0.5 + a.b | 0) + "," + a.a + ")"
            };
            this.eg = function(a) {
                return "rgba(" + (0.5 + a.r | 0) + "," + (0.5 + a.g | 0) + "," + (0.5 + a.b | 0) + ")"
            };
            this.cg = function(a) {
                return "hsla(" + (0.5 + a.h | 0) + "," + (0.5 + a.s | 0) + "%," + (0.5 + a.l | 0) + "%," + a.a + ")"
            };
            this.rc = function(a) {
                return "hsl(" + (0.5 + a.h | 0) + "," + (0.5 + a.s | 0) + "%," + (0.5 + a.l | 0) + "%)"
            };
            this.J = function(a, e, c) {
                return "hsl(" + (0.5 + a | 0) + "," + (0.5 + e | 0) + "%," + (0.5 + c | 0) + "%)"
            }
        };

    function X() {
        var a = !1,
            l, h = [],
            e = this,
            c = new function() {
                this.K = function(c) {
                    c && (a ? c.apply(e, l) : h.push(c));
                    return this
                };
                this.Ag = function(a) {
                    e = a;
                    return {
                        then: this.K
                    }
                }
            };
        this.I = function() {
            l = arguments;
            for (var c = 0; c < h.length; c++) h[c].apply(e, l);
            a = !0;
            return this
        };
        this.M = function() {
            return c
        }
    }

    function pa(a) {
        var l = new X,
            h = a.length;
        if (0 < a.length)
            for (var e = a.length - 1; 0 <= e; e--) a[e].K(function() {
                0 === --h && l.I()
            });
        else l.I();
        return l.M()
    }

    function qa(a) {
        var l = 0;
        this.c = function() {
            l++
        };
        this.k = function() {
            l--;
            0 === l && a()
        };
        this.clear = function() {
            l = 0
        };
        this.o = function() {
            return 0 === l
        }
    };
    var ra = {
        ie: function(a, l, h, e) {
            e = e || {};
            a = a.getBoundingClientRect();
            e.x = l - a.left;
            e.y = h - a.top;
            return e
        }
    };

    function sa() {
        var a = document,
            l = {};
        this.addEventListener = function(h, e) {
            var c = l[h];
            c || (c = [], l[h] = c);
            c.push(e);
            a.addEventListener(h, e)
        };
        this.c = function() {
            G.Ca(l, function(h, e) {
                for (var c = h.length - 1; 0 <= c; c--) a.removeEventListener(e, h[c])
            })
        }
    };

    function ta(a) {
        function l(a) {
            return function(b) {
                h(b) && a.apply(this, arguments)
            }
        }

        function h(b) {
            for (b = b.target; b;) {
                if (b === a) return !0;
                b = b.parentElement
            }
            return !1
        }

        function e(a, b, d) {
            d = d || {};
            c(a, d);
            for (var f = 0; f < b.length; f++) b[f].call(a.target, d);
            (void 0 === d.Cb && d.Oh || "prevent" === d.Cb) && a.preventDefault();
            return d
        }

        function c(b, c) {
            ra.ie(a, b.clientX, b.clientY, c);
            c.altKey = b.altKey;
            c.metaKey = b.metaKey;
            c.ctrlKey = b.ctrlKey;
            c.shiftKey = b.shiftKey;
            c.Fb = 3 === b.which;
            return c
        }
        var d = new sa,
            g = [],
            m = [],
            f = [],
            b = [],
            k = [],
            n = [],
            q = [],
            p = [],
            r = [],
            s = [];
        this.c = function(a) {
            g.push(a)
        };
        this.k = function(a) {
            b.push(a)
        };
        this.va = function(a) {
            m.push(a)
        };
        this.Da = function(a) {
            f.push(a)
        };
        this.za = function(a) {
            s.push(a)
        };
        this.wa = function(a) {
            k.push(a)
        };
        this.Ka = function(a) {
            n.push(a)
        };
        this.na = function(a) {
            q.push(a)
        };
        this.o = function(a) {
            p.push(a)
        };
        this.J = function(a) {
            r.push(a)
        };
        this.fb = function() {
            d.c()
        };
        var v, t, x, y, A = {
                x: 0,
                y: 0
            }, B = {
                x: 0,
                y: 0
            }, z = !1,
            C = !1;
        d.addEventListener("mousedown", l(function(b) {
            if (b.target !== a) {
                var c = e(b, f);
                B.x = c.x;
                B.y = c.y;
                A.x = c.x;
                A.y =
                    c.y;
                z = !0;
                e(b, q);
                t = !1;
                v = window.setTimeout(function() {
                    100 > U.c(A, c) && (window.clearTimeout(y), e(b, m), t = !0)
                }, 400)
            }
        }));
        d.addEventListener("mouseup", function(a) {
            function c(a) {
                var b = {};
                b.x = a.pageX;
                b.y = a.pageY;
                return b
            }
            if (z) {
                C && e(a, r);
                window.clearTimeout(v);
                if (!t && !C && h(a)) {
                    var d = c(a);
                    x && 100 > U.c(d, x) ? e(a, b) : e(a, g);
                    x = d;
                    y = window.setTimeout(function() {
                        x = null
                    }, 350)
                }
                C = z = !1
            }
        });
        d.addEventListener("mousemove", function(a) {
            var b = c(a, {});
            h(a) && e(a, k, {
                type: "move"
            });
            A.x = b.x;
            A.y = b.y;
            z && !C && 100 < U.c(B, A) && (C = !0);
            C && e(a, p,
                b)
        });
        d.addEventListener("mouseout", l(function(a) {
            e(a, n, {
                type: "out"
            })
        }));
        d.addEventListener(void 0 !== document.onmousewheel ? "mousewheel" : "MozMousePixelScroll", l(function(a) {
            var b = a.wheelDelta,
                c = a.detail;
            e(a, s, {
                fd: (c ? b ? 0 < b / c / 40 * c ? 1 : -1 : -c / (w.Je() ? 40 : 19) : b / 40) / 3,
                Oh: !0
            })
        }));
        d.addEventListener("contextmenu", l(function(a) {
            a.preventDefault()
        }))
    };
    var Z = function() {
        function a(a) {
            return function(d) {
                return Math.pow(d, a)
            }
        }

        function l(a) {
            return function(d) {
                return 1 - Math.pow(1 - d, a)
            }
        }

        function h(a) {
            return function(d) {
                return 1 > (d *= 2) ? 0.5 * Math.pow(d, a) : 1 - 0.5 * Math.abs(Math.pow(2 - d, a))
            }
        }

        function e(a) {
            return function(d) {
                for (var e = 0; e < a.length; e++) d = (0, a[e])(d);
                return d
            }
        }
        return {
            ha: function(a) {
                switch (a) {
                    case "linear":
                        return Z.zb;
                    case "bounce":
                        return Z.og;
                    case "squareIn":
                        return Z.Kf;
                    case "squareOut":
                        return Z.Gb;
                    case "squareInOut":
                        return Z.Lf;
                    case "cubicIn":
                        return Z.sg;
                    case "cubicOut":
                        return Z.ce;
                    case "cubicInOut":
                        return Z.tg;
                    case "quadIn":
                        return Z.fi;
                    case "quadOut":
                        return Z.hi;
                    case "quadInOut":
                        return Z.gi;
                    default:
                        return Z.zb
                }
            },
            zb: function(a) {
                return a
            },
            og: e([h(2),
                function(a) {
                    return 0 === a ? 0 : 1 === a ? 1 : a * (a * (a * (a * (25.9425 * a - 85.88) + 105.78) - 58.69) + 13.8475)
                }
            ]),
            Kf: a(2),
            Gb: l(2),
            Lf: h(2),
            sg: a(3),
            ce: l(3),
            tg: h(3),
            fi: a(2),
            hi: l(2),
            gi: h(2),
            c: e
        }
    }();
    var G = {
        R: function(a) {
            return void 0 === a
        },
        Ke: function(a) {
            return null === a
        },
        md: function(a) {
            return "[object Number]" === Object.prototype.toString.call(a)
        },
        Fc: function(a) {
            return "[object String]" === Object.prototype.toString.call(a)
        },
        ld: function(a) {
            return "function" === typeof a
        },
        Xb: function(a) {
            return a === Object(a)
        },
        kd: function(a, l) {
            return 1E-6 > a - l && -1E-6 < a - l
        },
        Ah: function(a) {
            return G.R(a) || G.Ke(a) || G.Fc(a) && !/\S/.test(a)
        },
        N: function(a, l) {
            return a && a.hasOwnProperty(l)
        },
        hb: function(a, l) {
            if (a)
                for (var h = l.length -
                    1; 0 <= h; h--)
                    if (a.hasOwnProperty(l[h])) return !0;
            return !1
        },
        extend: function(a) {
            G.vg(Array.prototype.slice.call(arguments, 1), function(l) {
                if (l)
                    for (var h in l) l.hasOwnProperty(h) && (a[h] = l[h])
            });
            return a
        },
        o: function(a, l) {
            return a.map(function(a) {
                return a[l]
            }, [])
        },
        vg: function(a, l, h) {
            null != a && (a.forEach ? a.forEach(l, h) : G.Ca(a, l, h))
        },
        Ca: function(a, l, h) {
            for (var e in a)
                if (a.hasOwnProperty(e) && !1 === l.call(h, a[e], e, a)) break
        },
        F: function() {
            for (var a = 0; a < arguments.length; a++) {
                var l = arguments[a];
                if (!(G.R(l) || G.md(l) &&
                    isNaN(l) || G.Fc(l) && G.Ah(l))) return l
            }
        },
        yf: function(a, l) {
            var h = a.indexOf(l);
            0 <= h && a.splice(h, 1)
        },
        ug: function(a, l, h) {
            var e;
            return function() {
                var c = this,
                    d = arguments,
                    g = h && !e;
                clearTimeout(e);
                e = setTimeout(function() {
                    e = null;
                    h || a.apply(c, d)
                }, l);
                g && a.apply(c, d)
            }
        },
        defer: function(a) {
            setTimeout(a, 1)
        },
        k: function(a) {
            return a
        },
        La: function() {}
    };
    var ua = {
        xh: function(a, l, h) {
            return w.wh() ? function() {
                var e = l + ":" + JSON.stringify(arguments),
                    c = window.localStorage.getItem(e);
                c && (c = JSON.parse(c));
                if (c && Date.now() - c.t < h) return c.v;
                c = a.apply(this, arguments);
                window.localStorage.setItem(e, JSON.stringify({
                    v: c,
                    t: Date.now()
                }));
                return c
            } : a
        }
    };
    var va = {
        m: function(a, l) {
            function h() {
                var e = [];
                if (Array.isArray(a))
                    for (var c = 0; c < a.length; c++) {
                        var d = a[c];
                        d && e.push(d.apply(l, arguments))
                    } else a && e.push(a.apply(l, arguments));
                return e
            }
            h.empty = function() {
                return 0 === a.length && !G.ld(a)
            };
            return h
        }
    };

    function wa() {
        var a = {};
        this.i = function(l, h) {
            var e = a[l];
            e || (e = [], a[l] = e);
            e.push(h)
        };
        this.p = function(l, h) {
            var e = a[l];
            if (e)
                for (var c = Array.prototype.slice.call(arguments, 1), d = 0; d < e.length; d++) e[d].apply(this, c)
        }
    };
    var xa = {
        Gf: function(a) {
            for (var l = "", h = 0; h < a.length; h++) l += String.fromCharCode(a.charCodeAt(h) ^ 1);
            return l
        }
    };

    function ya(a) {
        function l(b, c, h) {
            var l = this,
                p, r = 0;
            this.id = g++;
            this.name = h ? h : "{unnamed on " + b + "}";
            this.target = function() {
                return b
            };
            this.wb = function() {
                return -1 != f.indexOf(l)
            };
            this.start = function() {
                if (!l.wb()) {
                    if (-1 == f.indexOf(l)) {
                        var b = m.now();
                        !0 === l.Te(b) && (f = f.slice(), f.push(l))
                    }
                    0 < f.length && a.repeat(e)
                }
                return this
            };
            this.stop = function() {
                for (d(l); p < c.length; p++) {
                    var a = c[p];
                    a.bb && a.Ta.call()
                }
                return this
            };
            this.Af = function() {
                p = void 0
            };
            this.Te = function(a) {
                r++;
                if (0 !== c.length) {
                    var b;
                    G.R(p) ? (p = 0, b = c[p], b.S &&
                        b.S.call(b, a, r, l)) : b = c[p];
                    for (; p < c.length;) {
                        if (b.Ta && b.Ta.call(b, a, r, l)) return !0;
                        b.Ba && b.Ba.call(b, a, r, l);
                        G.R(p) && (p = -1);
                        ++p < c.length && (b = c[p], b.S && b.S.call(b, a, r, l))
                    }
                }
                return !1
            }
        }

        function h(a) {
            return G.R(a) ? f.slice() : f.filter(function(c) {
                return c.target() === a
            })
        }

        function e() {
            c();
            0 == f.length && a.cancel(e)
        }

        function c() {
            var a = m.now();
            f.forEach(function(c) {
                !0 !== c.Te(a) && d(c)
            })
        }

        function d(a) {
            f = f.filter(function(c) {
                return c !== a
            })
        }
        var g = 0,
            m = F.create(),
            f = [];
        this.c = function() {
            for (var a = f.length - 1; 0 <= a; a--) f[a].stop();
            f = []
        };
        this.B = function() {
            function a() {}

            function c(a) {
                var b = a.target,
                    d = a.duration,
                    f = a.W,
                    e, h;
                this.S = function() {
                    e = {};
                    for (var c in a.D) b.hasOwnProperty(c) && (e[c] = {
                        start: G.R(a.D[c].start) ? b[c] : G.ld(a.D[c].start) ? a.D[c].start.call(void 0) : a.D[c].start,
                        end: G.R(a.D[c].end) ? b[c] : G.ld(a.D[c].end) ? a.D[c].end.call(void 0) : a.D[c].end,
                        L: G.R(a.D[c].L) ? Z.zb : a.D[c].L
                    });
                    h = m.now()
                };
                this.Ta = function() {
                    var a = m.now() - h,
                        a = 0 === d ? 1 : Math.min(d, a) / d,
                        c;
                    for (c in e) {
                        var g = e[c];
                        b[c] = g.start + (g.end - g.start) * g.L(a)
                    }
                    f && f.call(b, a);
                    return 1 > a
                }
            }

            function d(a, b, c) {
                this.bb = c;
                this.Ta = function() {
                    a.call(b);
                    return !1
                }
            }

            function f(a) {
                var b;
                this.S = function(c, d) {
                    b = d + a
                };
                this.Ta = function(a, c) {
                    return c < b
                }
            }

            function e(a) {
                var b;
                this.S = function(c) {
                    b = c + a
                };
                this.Ta = function(a) {
                    return a < b
                }
            }

            function g(a) {
                this.S = function() {
                    a.forEach(function(a) {
                        a.start()
                    })
                };
                this.Ta = function() {
                    for (var b = 0; b < a.length; b++)
                        if (a[b].wb()) return !0;
                    return !1
                }
            }
            a.m = function(a, b) {
                return new function() {
                    function h(b, c, f, e) {
                        return c ? (G.R(f) && (f = a), b.rb(new d(c, f, e))) : b
                    }
                    var m = [];
                    this.rb =
                        function(a) {
                            m.push(a);
                            return this
                    };
                    this.Za = function(a) {
                        return this.rb(new e(a))
                    };
                    this.Vd = function(a) {
                        return this.rb(new f(a || 1))
                    };
                    this.call = function(a, b) {
                        return h(this, a, b, !1)
                    };
                    this.bb = function(a, b) {
                        return h(this, a, b, !0)
                    };
                    this.ba = function(b) {
                        G.R(b.target) && (b.target = a);
                        return this.rb(new c(b))
                    };
                    this.Ua = function(a) {
                        return this.rb(new g(a))
                    };
                    this.Af = function() {
                        return this.rb({
                            Ta: function(a, b) {
                                b.Af();
                                return !0
                            }
                        })
                    };
                    this.ua = function() {
                        return new l(a, m, b)
                    };
                    this.start = function() {
                        return this.ua().start()
                    };
                    this.$f = function() {
                        var a = new X;
                        this.Vd().call(a.I).ua();
                        return a.M()
                    };
                    this.Xa = function() {
                        var a = this.$f();
                        this.start();
                        return a
                    }
                }
            };
            a.jc = function(c) {
                h(c).forEach(function(a) {
                    a.stop()
                });
                return a.m(c, void 0)
            };
            return a
        }()
    };
    var $ = function() {
        var a = {
            he: function(a, h) {
                if (a.e)
                    for (var e = a.e, c = 0; c < e.length; c++) h(e[c], c)
            },
            xc: function(l, h) {
                if (l.e)
                    for (var e = l.e, c = 0; c < e.length; c++)
                        if (!1 === a.xc(e[c], h) || !1 === h(e[c], c)) return !1
            }
        };
        a.C = a.xc;
        a.yc = function(l, h) {
            if (l.e)
                for (var e = l.e, c = 0; c < e.length; c++)
                    if (!1 === h(e[c], c) || !1 === a.yc(e[c], h)) return !1
        };
        a.Ha = function(l, h) {
            if (l.e)
                for (var e = l.e, c = 0; c < e.length; c++)
                    if (!1 === a.Ha(e[c], h)) return !1;
            return h(l)
        };
        a.$i = a.Ha;
        a.gd = function(l, h) {
            !1 !== h(l) && a.yc(l, h)
        };
        a.zc = function(l, h) {
            var e = [];
            a.yc(l, function(a) {
                e.push(a)
            });
            return h ? e.filter(h) : e
        };
        a.ge = function(a, h) {
            for (var e = a.parent; e && !1 !== h(e);) e = e.parent
        };
        a.zh = function(a, h) {
            for (var e = a.parent; e && e !== h;) e = e.parent;
            return !!e
        };
        return a
    }();
    var U = new function() {
            function a(a, e) {
                var c = a.x - e.x,
                    d = a.y - e.y;
                return c * c + d * d
            }

            function l(a, e, c) {
                for (var d = 0; d < a.length; d++) {
                    var g = U.wa(a[d], a[d + 1] || a[0], e, c, !0);
                    if (g) return g
                }
            }
            this.wa = function(a, e, c, d, g) {
                var m = a.x;
                a = a.y;
                var f = e.x - m;
                e = e.y - a;
                var b = c.x,
                    k = c.y;
                c = d.x - b;
                var l = d.y - k;
                d = f * l - c * e;
                if (!(1E-12 >= d && -1E-12 <= d) && (b = b - m, k = k - a, c = (b * l - c * k) / d, d = (b * e - f * k) / d, 0 <= d && (g || 1 >= d) && 0 <= c && 1 >= c)) return {
                    x: m + f * c,
                    y: a + e * c
                }
            };
            this.dg = function(a, e, c, d) {
                var g = a.x;
                a = a.y;
                var m = e.x - g;
                e = e.y - a;
                var f = c.x;
                c = c.y;
                var b = d.x - f;
                d = d.y -
                    c;
                var k = m * d - b * e;
                if (!(1E-12 >= k && -1E-12 <= k) && (d = ((f - g) * d - b * (c - a)) / k, 0 <= d && 1 >= d)) return {
                    x: g + m * d,
                    y: a + e * d
                }
            };
            this.Yd = function(a, e, c) {
                for (var d = U.k(e, {}), g = U.k(c, {}), m, f = g.x - d.x, b = g.y - d.y, k = [], g = 0; g < c.length; g++) m = c[g], k.push({
                    x: m.x - f,
                    y: m.y - b
                });
                c = [];
                m = [];
                for (g = 0; g < a.length; g++) {
                    var n = a[g],
                        q = l(e, d, n);
                    q ? (c.push(q), m.push(l(k, d, n))) : (c.push(null), m.push(null))
                }
                for (g = 0; g < a.length; g++)
                    if (q = c[g], n = m[g], q && n) {
                        e = a[g];
                        var k = d,
                            p = q.x - d.x,
                            q = q.y - d.y,
                            q = Math.sqrt(p * p + q * q);
                        if (1E-12 < q) {
                            var p = e.x - d.x,
                                r = e.y - d.y,
                                q = Math.sqrt(p *
                                    p + r * r) / q;
                            e.x = k.x + q * (n.x - k.x);
                            e.y = k.y + q * (n.y - k.y)
                        } else e.x = k.x, e.y = k.y
                    }
                for (g = 0; g < a.length; g++) m = a[g], m.x += f, m.y += b
            };
            this.A = function(a, e) {
                if (0 !== a.length) {
                    var c, d, g, m;
                    c = d = a[0].x;
                    g = m = a[0].y;
                    for (var f = a.length; 0 < --f;) c = Math.min(c, a[f].x), d = Math.max(d, a[f].x), g = Math.min(g, a[f].y), m = Math.max(m, a[f].y);
                    e.x = c;
                    e.y = g;
                    e.f = d - c;
                    e.j = m - g;
                    return e
                }
            };
            this.oc = function(a) {
                return [{
                    x: a.x,
                    y: a.y
                }, {
                    x: a.x + a.f,
                    y: a.y
                }, {
                    x: a.x + a.f,
                    y: a.y + a.j
                }, {
                    x: a.x,
                    y: a.y + a.j
                }]
            };
            this.k = function(a, e) {
                for (var c = 0, d = 0, g = a.length, m = a[0], f = 0, b = 1; b <
                    g - 1; b++) var k = a[b],
                l = a[b + 1], q = m.y + k.y + l.y, p = (k.x - m.x) * (l.y - m.y) - (l.x - m.x) * (k.y - m.y), c = c + p * (m.x + k.x + l.x), d = d + p * q, f = f + p;
                e.x = c / (3 * f);
                e.y = d / (3 * f);
                e.fa = f / 2;
                return e
            };
            this.Ya = function(a, e) {
                for (var c = 0; c < a.length; c++) {
                    var d = a[c],
                        g = a[c + 1] || a[0];
                    if (0 > (e.y - d.y) * (g.x - d.x) - (e.x - d.x) * (g.y - d.y)) return !1
                }
                return !0
            };
            this.gg = function(a, e, c) {
                var d = a.x,
                    g = e.x;
                a.x > e.x && (d = e.x, g = a.x);
                g > c.x + c.f && (g = c.x + c.f);
                d < c.x && (d = c.x);
                if (d > g) return !1;
                var m = a.y,
                    f = e.y,
                    b = e.x - a.x;
                1E-7 < Math.abs(b) && (f = (e.y - a.y) / b, a = a.y - f * a.x, m = f * d + a, f = f *
                    g + a);
                m > f && (d = f, f = m, m = d);
                f > c.y + c.j && (f = c.y + c.j);
                m < c.y && (m = c.y);
                return m <= f
            };
            this.Zd = function(h, e, c, d, g) {
                var m, f;

                function b(b, c, d) {
                    if (e.x === n.x && e.y === n.y) return d;
                    var g = l(h, e, n),
                        p = Math.sqrt(a(g, e) / (b * b + c * c));
                    return p < k ? (k = p, m = g.x, f = g.y, 0 !== c ? Math.abs(f - e.y) / Math.abs(c) : Math.abs(m - e.x) / Math.abs(b)) : d
                }
                d = G.F(d, 0.5);
                g = G.F(g, 0.5);
                c = G.F(c, 1);
                var k = Number.MAX_VALUE;
                f = m = 0;
                var n = {
                    x: 0,
                    y: 0
                }, q, p = d * c;
                c = (1 - d) * c;
                d = 1 - g;
                n.x = e.x - p;
                n.y = e.y - g;
                q = b(p, g, q);
                n.x = e.x + c;
                n.y = e.y - g;
                q = b(c, g, q);
                n.x = e.x - p;
                n.y = e.y + d;
                q = b(p, d, q);
                n.x =
                    e.x + c;
                n.y = e.y + d;
                return q = b(c, d, q)
            };
            this.Zf = function(a, e) {
                function c(a, c, d) {
                    var f = c.x,
                        e = d.x;
                    c = c.y;
                    d = d.y;
                    var g = e - f,
                        h = d - c;
                    return Math.abs(h * a.x - g * a.y - f * d + e * c) / Math.sqrt(g * g + h * h)
                }
                for (var d = a.length, g = c(e, a[d - 1], a[0]), m = 0; m < d - 1; m++) {
                    var f = c(e, a[m], a[m + 1]);
                    f < g && (g = f)
                }
                return g
            };
            this.ig = function(a, e, c) {
                var d;
                c = {
                    x: e.x + Math.cos(c),
                    y: e.y - Math.sin(c)
                };
                var g = [],
                    m = [],
                    f = a.length;
                for (d = 0; d < f; d++) {
                    var b = U.dg(a[d], a[(d + 1) % f], e, c);
                    if (b && (g.push(b), 2 == m.push(d))) break
                }
                if (2 == g.length) {
                    var b = g[0],
                        g = g[1],
                        k = m[0],
                        m = m[1],
                        l = [g, b];
                    for (d = k + 1; d <= m; d++) l.push(a[d]);
                    for (d = [b, g]; m != k;) m = (m + 1) % f, d.push(a[m]);
                    a = [l, d];
                    f = c.x - e.x;
                    d = g.x - b.x;
                    0 === f && (f = c.y - e.y, d = g.y - b.y);
                    (0 > f ? -1 : 0 < f ? 1 : 0) !== (0 > d ? -1 : 0 < d ? 1 : 0) && a.reverse();
                    return a
                }
            };
            this.Ka = function(a, e, c, d) {
                d.x = a * (e.x - c.x) + c.x;
                d.y = a * (e.y - c.y) + c.y
            };
            this.c = a;
            return this
        };
    var za = new function() {
            function a(a, c) {
                this.face = a;
                this.Uc = c;
                this.ec = this.Oc = null
            }

            function l(a, c, e) {
                this.ea = [a, c, e];
                this.G = Array(3);
                var f = c.y - a.y,
                    b = e.z - a.z,
                    k = c.x - a.x;
                c = c.z - a.z;
                var h = e.x - a.x;
                a = e.y - a.y;
                this.Ja = {
                    x: f * b - c * a,
                    y: c * h - k * b,
                    z: k * a - f * h
                };
                this.eb = [];
                this.bd = this.visible = !1
            }
            this.o = function(d) {
                function e(b, c, d) {
                    var g, k, h = b.ea[0],
                        m = b.Ja,
                        p = m.x,
                        s = m.y,
                        m = m.z,
                        l = Array(n);
                    c = c.eb;
                    g = c.length;
                    for (f = 0; f < g; f++) k = c[f].Uc, l[k.index] = !0, 0 > p * (k.x - h.x) + s * (k.y - h.y) + m * (k.z - h.z) && a.c(b, k);
                    c = d.eb;
                    g = c.length;
                    for (f = 0; f < g; f++) k =
                        c[f].Uc, !0 !== l[k.index] && 0 > p * (k.x - h.x) + s * (k.y - h.y) + m * (k.z - h.z) && a.c(b, k)
                }
                var m, f, b, k, n = d.length;
                for (m = 0; m < n; m++) d[m].index = m, d[m].Mb = null;
                var q = [],
                    p;
                if (0 < (p = function() {
                    function b(a, c, d, f) {
                        var e = (c.y - a.y) * (d.z - a.z) - (c.z - a.z) * (d.y - a.y),
                            g = (c.z - a.z) * (d.x - a.x) - (c.x - a.x) * (d.z - a.z),
                            k = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
                        return e * f.x + g * f.y + k * f.z > e * a.x + g * a.y + k * a.z ? new l(a, c, d) : new l(d, c, a)
                    }

                    function c(a, b, d, f) {
                        function e(a, b, c) {
                            a = a.ea;
                            b = a[0] == b ? 0 : a[1] == b ? 1 : 2;
                            return a[(b + 1) % 3] != c ? (b + 2) % 3 : b
                        }
                        b.G[e(b, d, f)] =
                            a;
                        a.G[e(a, f, d)] = b
                    }
                    if (4 > n) return 0;
                    var f = d[0],
                        e = d[1],
                        g = d[2],
                        k = d[3],
                        h = b(f, e, g, k),
                        m = b(f, g, k, e),
                        p = b(f, e, k, g),
                        s = b(e, g, k, f);
                    c(h, m, g, f);
                    c(h, p, f, e);
                    c(h, s, e, g);
                    c(m, p, k, f);
                    c(m, s, g, k);
                    c(p, s, k, e);
                    q.push(h, m, p, s);
                    for (f = 4; f < n; f++)
                        for (e = d[f], g = 0; 4 > g; g++) k = q[g], h = k.ea[0], m = k.Ja, 0 > m.x * (e.x - h.x) + m.y * (e.y - h.y) + m.z * (e.z - h.z) && a.c(k, e);
                    return 4
                }())) {
                    for (; p < n;) {
                        b = d[p];
                        if (b.Mb) {
                            for (m = b.Mb; null !== m;) m.face.visible = !0, m = m.ec;
                            var r, s;
                            m = 0;
                            a: for (; m < q.length; m++)
                                if (k = q[m], !1 === k.visible) {
                                    var v = k.G;
                                    for (f = 0; 3 > f; f++)
                                        if (!0 === v[f].visible) {
                                            r =
                                                k;
                                            s = f;
                                            break a
                                        }
                                }
                            k = [];
                            var v = [],
                                t = r,
                                x = s;
                            do
                                if (k.push(t), v.push(x), x = (x + 1) % 3, !1 === t.G[x].visible) {
                                    do
                                        for (m = t.ea[x], t = t.G[x], f = 0; 3 > f; f++) t.ea[f] == m && (x = f); while (!1 === t.G[x].visible && (t !== r || x !== s))
                                } while (t !== r || x !== s);
                            var y = null,
                                A = null;
                            for (m = 0; m < k.length; m++) {
                                var t = k[m],
                                    x = v[m],
                                    B = t.G[x],
                                    z = t.ea[(x + 1) % 3],
                                    C = t.ea[x],
                                    K = z.y - b.y,
                                    O = C.z - b.z,
                                    P = z.x - b.x,
                                    T = z.z - b.z,
                                    N = C.x - b.x,
                                    W = C.y - b.y,
                                    M;
                                0 < c.length ? (M = c.pop(), M.ea[0] = b, M.ea[1] = z, M.ea[2] = C, M.Ja.x = K * O - T * W, M.Ja.y = T * N - P * O, M.Ja.z = P * W - K * N, M.eb.length = 0, M.visible = !1, M.bd = !0) :
                                    M = {
                                        ea: [b, z, C],
                                        G: Array(3),
                                        Ja: {
                                            x: K * O - T * W,
                                            y: T * N - P * O,
                                            z: P * W - K * N
                                        },
                                        eb: [],
                                        visible: !1
                                };
                                q.push(M);
                                t.G[x] = M;
                                M.G[1] = t;
                                null !== A && (A.G[0] = M, M.G[2] = A);
                                A = M;
                                null === y && (y = M);
                                e(M, t, B)
                            }
                            A.G[0] = y;
                            y.G[2] = A;
                            m = [];
                            for (f = 0; f < q.length; f++)
                                if (k = q[f], !0 === k.visible) {
                                    v = k.eb;
                                    t = v.length;
                                    for (b = 0; b < t; b++) x = v[b], y = x.Oc, A = x.ec, null !== y && (y.ec = A), null !== A && (A.Oc = y), null === y && (x.Uc.Mb = A), h.push(x);
                                    k.bd && c.push(k)
                                } else m.push(k);
                            q = m
                        }
                        p++
                    }
                    for (m = 0; m < q.length; m++) k = q[m], k.bd && c.push(k)
                }
                return {
                    je: q
                }
            };
            a.c = function(c, e) {
                var m;
                0 < h.length ? (m = h.pop(),
                    m.face = c, m.Uc = e, m.ec = null, m.Oc = null) : m = new a(c, e);
                c.eb.push(m);
                var f = e.Mb;
                null !== f && (f.Oc = m);
                m.ec = f;
                e.Mb = m
            };
            for (var h = Array(2E3), e = 0; e < h.length; e++) h[e] = new a(null, null);
            for (var c = Array(1E3), e = 0; e < c.length; e++) c[e] = {
                ea: Array(3),
                G: Array(3),
                Ja: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                eb: [],
                visible: !1
            }
        };
    var Aa = new function() {
            function a(a, e, c, d, g, m, f, b) {
                var k = (a - c) * (m - b) - (e - d) * (g - f);
                return Math.abs(k) < l ? void 0 : {
                    x: ((a * d - e * c) * (g - f) - (a - c) * (g * b - m * f)) / k,
                    y: ((a * d - e * c) * (m - b) - (e - d) * (g * b - m * f)) / k
                }
            }
            var l = 1E-12;
            this.Va = function(h, e) {
                for (var c = h[0], d = c.x, g = c.y, m = c.x, f = c.y, b = h.length - 1; 0 < b; b--) c = h[b], d = Math.min(d, c.x), g = Math.min(g, c.y), m = Math.max(m, c.x), f = Math.max(f, c.y);
                if (m - d < 3 * e || f - g < 3 * e) c = void 0;
                else {
                    a: {
                        c = !0;
                        void 0 == c && (c = !1);
                        d = [];
                        g = h.length;
                        for (m = 0; m <= g; m++) {
                            var f = h[m % g],
                                b = h[(m + 1) % g],
                                k = h[(m + 2) % g],
                                n, q, p;
                            n = b.x -
                                f.x;
                            q = b.y - f.y;
                            p = Math.sqrt(n * n + q * q);
                            var r = e * n / p,
                                s = e * q / p;
                            n = k.x - b.x;
                            q = k.y - b.y;
                            p = Math.sqrt(n * n + q * q);
                            n = e * n / p;
                            q = e * q / p;
                            if (f = a(f.x - s, f.y + r, b.x - s, b.y + r, b.x - q, b.y + n, k.x - q, k.y + n))
                                if (d.push(f), k = d.length, c && 3 <= k && (f = d[k - 3], b = d[k - 2], k = d[k - 1], 0 > (b.x - f.x) * (k.y - f.y) - (k.x - f.x) * (b.y - f.y))) {
                                    c = void 0;
                                    break a
                                }
                        }
                        d.shift();
                        c = 3 > d.length ? void 0 : d
                    }
                    if (!c) a: {
                        d = h.slice(0);
                        for (c = 0; c < h.length; c++) {
                            m = h[c % h.length];
                            b = h[(c + 1) % h.length];
                            k = b.x - m.x;
                            g = b.y - m.y;
                            f = Math.sqrt(k * k + g * g);
                            k = e * k / f;
                            f = e * g / f;
                            g = m.x - f;
                            m = m.y + k;
                            f = b.x - f;
                            b = b.y + k;
                            if (0 != d.length) {
                                s =
                                    g - f;
                                q = m - b;
                                k = [];
                                n = p = !0;
                                r = void 0;
                                for (r = 0; r < d.length; r++) {
                                    var v = s * (m - d[r].y) - (g - d[r].x) * q;
                                    v <= l && v >= -l && (v = 0);
                                    k.push(v);
                                    0 < v && (p = !1);
                                    0 > v && (n = !1)
                                }
                                if (p) d = [];
                                else if (!n) {
                                    s = [];
                                    for (r = 0; r < d.length; r++) q = (r + 1) % d.length, p = k[r], n = k[q], 0 <= p && s.push(d[r]), (0 < p && 0 > n || 0 > p && 0 < n) && s.push(a(d[r].x, d[r].y, d[q].x, d[q].y, g, m, f, b));
                                    d = s
                                }
                            }
                            if (3 > d.length) {
                                c = void 0;
                                break a
                            }
                        }
                        c = d
                    }
                }
                return c
            };
            return this
        };
    var Ba = new function() {
            function a(a) {
                for (var e = a[0].x, c = a[0].y, d = e, g = c, m = 1; m < a.length; m++) var f = a[m],
                e = Math.min(e, f.x), c = Math.min(c, f.y), d = Math.max(d, f.x), g = Math.max(g, f.y);
                a = d - e;
                g = g - c;
                return [{
                    x: e + 2 * a,
                    y: c + 2 * g,
                    f: 0
                }, {
                    x: e + 2 * a,
                    y: c - 2 * g,
                    f: 0
                }, {
                    x: e - 2 * a,
                    y: c + 2 * g,
                    f: 0
                }]
            }
            var l = 1E-12;
            this.o = function(h, e) {
                function c() {
                    for (b = 0; b < p.length; b++) {
                        var a = p[b],
                            c = a.ea,
                            d = c[0],
                            f = c[1],
                            e = c[2],
                            c = d.x,
                            g = d.y,
                            d = d.z,
                            k = f.x,
                            h = f.y,
                            f = f.z,
                            m = e.x,
                            s = e.y,
                            e = e.z,
                            l = c * (h - s) + k * (s - g) + m * (g - h);
                        a.$ = {
                            x: -(g * (f - e) + h * (e - d) + s * (d - f)) / l / 2,
                            y: -(d * (k - m) + f * (m -
                                c) + e * (c - k)) / l / 2
                        }
                    }
                }

                function d(a) {
                    for (b = 0; b < p.length; b++) {
                        var c = p[b];
                        c.kb = !U.Ya(a, c.$)
                    }
                }

                function g(a, b) {
                    var c = Array(b.length),
                        d;
                    for (d = 0; d < c.length; d++) c[d] = [];
                    for (d = 0; d < a.length; d++) {
                        var f = a[d];
                        if (!(0 > f.Ja.z))
                            for (var e = f.G, g = 0; g < e.length; g++) {
                                var k = e[g];
                                if (!(0 > k.Ja.z)) {
                                    var h = f.ea,
                                        m = h[(g + 1) % 3].index,
                                        h = h[g].index;
                                    2 < m && c[m - 3].push([f, k, 2 < h ? b[h - 3] : null])
                                }
                            }
                    }
                    return c
                }

                function m(a) {
                    var b = [a[0]],
                        c = a[0][0],
                        d = a[0][1],
                        f = a.length,
                        e = 1;
                    a: for (; e < f; e++)
                        for (var g = 1; g < f; g++) {
                            var k = a[g];
                            if (null !== k) {
                                if (k[1] === c)
                                    if (b.unshift(k),
                                        c = k[0], a[g] = null, b.length === f) break a;
                                    else continue;
                                if (k[0] === d && (b.push(k), d = k[1], a[g] = null, b.length === f)) break a
                            }
                        }
                    b[0][0] != b[f - 1][1] && b.push([b[f - 1][1], b[0][0]]);
                    return b
                }

                function f(a, b, c, d) {
                    var f = [],
                        e = [],
                        g = c.length,
                        k, h = b.length,
                        m = 0,
                        p = -1,
                        s = -1,
                        n = -1,
                        r = null,
                        q = d;
                    for (d = 0; d < g; d++) {
                        var v = (q + 1) % g,
                            t = c[q][0],
                            I = c[v][0];
                        if (U.c(t.$, I.$) > l)
                            if (t.kb && I.kb) {
                                var L = [],
                                    Q = [];
                                for (k = 0; k < h; k++) {
                                    p = (m + 1) % h;
                                    if (r = U.wa(b[m], b[p], t.$, I.$, !1))
                                        if (Q.push(m), 2 === L.push(r)) break;
                                    m = p
                                }
                                if (2 === L.length) {
                                    p = L[1];
                                    r = U.c(t.$, L[0]);
                                    p = U.c(t.$,
                                        p);
                                    t = r < p ? 0 : 1;
                                    r = r < p ? 1 : 0;
                                    p = Q[t]; - 1 === s && (s = p);
                                    if (-1 !== n)
                                        for (; p != n;) n = (n + 1) % h, f.push(b[n]), e.push(null);
                                    f.push(L[t], L[r]);
                                    e.push(c[q][2], null);
                                    n = Q[r]
                                }
                            } else if (t.kb && !I.kb)
                            for (k = 0; k < h; k++) {
                                p = (m + 1) % h;
                                if (r = U.wa(b[m], b[p], t.$, I.$, !1)) {
                                    if (-1 !== n)
                                        for (L = n; m != L;) L = (L + 1) % h, f.push(b[L]), e.push(null);
                                    f.push(r);
                                    e.push(c[q][2]); - 1 === s && (s = m);
                                    break
                                }
                                m = p
                            } else if (!t.kb && I.kb)
                                for (k = 0; k < h; k++) {
                                    p = (m + 1) % h;
                                    if (r = U.wa(b[m], b[p], t.$, I.$, !1)) {
                                        f.push(t.$, r);
                                        e.push(c[q][2], null);
                                        n = m;
                                        break
                                    }
                                    m = p
                                } else f.push(t.$), e.push(c[q][2]);
                        q =
                            v
                    }
                    if (0 == f.length) e = f = null;
                    else if (-1 !== n)
                        for (; s != n;) n = (n + 1) % h, f.push(b[n]), e.push(null);
                    a.n = f;
                    a.G = e
                }
                if (1 === h.length) h[0].n = e.slice(0), h[0].G = [];
                else {
                    var b, k;
                    k = a(e);
                    var n = [],
                        q;
                    for (b = 0; b < k.length; b++) q = k[b], n.push({
                        x: q.x,
                        y: q.y,
                        z: q.x * q.x + q.y * q.y - q.f
                    });
                    for (b = 0; b < h.length; b++) q = h[b], q.n = null, n.push({
                        x: q.x,
                        y: q.y,
                        z: q.x * q.x + q.y * q.y - q.f
                    });
                    var p = za.o(n).je;
                    c();
                    d(e);
                    n = g(p, h);
                    for (b = 0; b < h.length; b++)
                        if (q = n[b], 0 !== q.length) {
                            var r = h[b];
                            q = m(q);
                            var s = q.length,
                                v = -1;
                            for (k = 0; k < s; k++) q[k][0].kb && (v = k);
                            if (0 <= v) f(r, e, q,
                                v);
                            else {
                                var v = [],
                                    t = [];
                                for (k = 0; k < s; k++) U.c(q[k][0].$, q[(k + 1) % s][0].$) > l && (v.push(q[k][0].$), t.push(q[k][2]));
                                r.n = v;
                                r.G = t
                            }
                            r.n && 3 > r.n.length && (r.n = null, r.G = null)
                        }
                }
            };
            this.qc = function(h, e) {
                var c, d, g = !1,
                    m = h.length;
                for (d = 0; d < m; d++) c = h[d], null === c.n && (g = !0), c.Wd = c.f;
                if (g) {
                    var g = a(e),
                        f = [],
                        b, k;
                    d = h.length;
                    for (c = 0; c < g.length; c++) b = g[c], f.push({
                        x: b.x,
                        y: b.y,
                        z: b.x * b.x + b.y * b.y
                    });
                    for (c = 0; c < d; c++) b = h[c], f.push({
                        x: b.x,
                        y: b.y,
                        z: b.x * b.x + b.y * b.y
                    });
                    b = za.o(f).je;
                    g = Array(d);
                    for (c = 0; c < d; c++) g[c] = {};
                    f = b.length;
                    for (c = 0; c < f; c++)
                        if (k =
                            b[c], 0 < k.Ja.z) {
                            var l = k.ea,
                                q = l.length;
                            for (k = 0; k < q - 1; k++) {
                                var p = l[k].index - 3,
                                    r = l[k + 1].index - 3;
                                0 <= p && 0 <= r && (g[p][r] = !0, g[r][p] = !0)
                            }
                            k = l[0].index - 3;
                            0 <= r && 0 <= k && (g[r][k] = !0, g[k][r] = !0)
                        }
                    for (c = 0; c < d; c++) {
                        k = g[c];
                        b = h[c];
                        var r = Number.MAX_VALUE,
                            f = null,
                            s;
                        for (s in k) k = h[s], l = U.c(b, k), r > l && (r = l, f = k);
                        b.gj = f;
                        b.Re = Math.sqrt(r)
                    }
                    for (d = 0; d < m; d++) c = h[d], s = Math.min(Math.sqrt(c.f), 0.95 * c.Re), c.f = s * s;
                    this.o(h, e);
                    for (d = 0; d < m; d++) c = h[d], c.Wd !== c.f && 0 < c.kc && (s = Math.min(c.kc, c.Wd - c.f), c.f += s, c.kc -= s)
                }
            }
        };
    var Ca = new function() {
            this.Yf = function(a) {
                a = a.e;
                for (var l = 0, h = a.length, e = 0; e < h; e++) {
                    var c = a[e];
                    if (c.n) {
                        var d = c.x,
                            g = c.y;
                        U.k(c.n, c);
                        d = d - c.x;
                        c = g - c.y;
                        c = (0 < d ? d : -d) + (0 < c ? c : -c);
                        l < c && (l = c)
                    }
                }
                return l
            };
            this.na = function(a, l) {
                var h = a.e,
                    e, c, d, g;
                switch (l) {
                    case "random":
                        return a.e[Math.floor(h.length * Math.random())];
                    case "topleft":
                        e = h[0];
                        var m = e.x + e.y;
                        for (g = 1; g < h.length; g++) c = h[g], d = c.x + c.y, d < m && (m = d, e = c);
                        return e;
                    case "bottomright":
                        e = h[0];
                        m = e.x + e.y;
                        for (g = 1; g < h.length; g++) c = h[g], d = c.x + c.y, d > m && (m = d, e = c);
                        return e;
                    default:
                        e = h[0];
                        d = c = U.c(a, e);
                        for (g = h.length - 1; 1 <= g; g--) m = h[g], c = U.c(a, m), c < d && (d = c, e = m);
                        return e
                }
            };
            this.Da = function(a, l, h) {
                var e = a.e,
                    c = e.length;
                for (a = 0; a < c; a++) e[a].Vc = !1, e[a].Ub = 0;
                var c = [],
                    d, g;
                g = d = 0;
                c[d++] = l || e[0];
                for (l = l.Ub = 0; g < d;)
                    if (e = c[g++], !e.Vc && e.G) {
                        h(e, l++, e.Ub);
                        e.Vc = !0;
                        var m = e.G,
                            f = m.length;
                        for (a = 0; a < f; a++) {
                            var b = m[a];
                            b && !0 !== b.Vc && (0 === b.Ub && (b.Ub = e.Ub + 1), c[d++] = b)
                        }
                    }
            }
        };
    var J = function() {
        function a(a, f, k, p, s, r, v, T) {
            var N = G.extend({}, m, a);
            1 > a.lineHeight && (a.lineHeight = 1);
            a = N.fontFamily;
            var W = N.bc,
                M = N.Jc,
                u = {
                    ka: !1,
                    $b: 0,
                    fontSize: 0
                };
            f.save();
            f.font = y + "px " + a;
            f.textBaseline = "middle";
            f.textAlign = "center";
            l(N, f);
            k = k.trim();
            t.text = k;
            c(p, s, r, x);
            if (/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(k)) e(t), h(f, t, a), d(N, t, x, M, W, !0, u);
            else if (h(f, t, a), d(N, t, x, M, W, !1, u), !u.ka && (v && (e(t), h(f, t, a)), T || v)) T && (u.Pb = !0), d(N, t, x, M, M, !0, u);
            if (u.ka) {
                var D =
                    "",
                    E = 0,
                    H = Number.MAX_VALUE,
                    I = Number.MIN_VALUE;
                g(N, t, u.$b, u.fontSize, x, u.Pb, function(a, c) {
                    0 < D.length && c === b && (D += b);
                    D += a
                }, function(a, b, c, d, e) {
                    d === q && (D += n);
                    f.save();
                    f.translate(r.x, b);
                    a = u.fontSize / y;
                    f.scale(a, a);
                    f.fillText(D, 0, 0);
                    f.restore();
                    D = c;
                    E < e && (E = e);
                    H > b && (H = b);
                    I < b && (I = b)
                });
                u.X = {
                    x: r.x - E / 2,
                    y: H - u.fontSize / 2,
                    f: E,
                    j: I - H + u.fontSize
                };
                f.restore()
            } else f.clear();
            return u
        }

        function l(a, c) {
            var d = void 0 !== a.fontFamily ? a.fontFamily : m.fontFamily,
                e = f[d];
            void 0 === e && (e = {}, f[d] = e);
            e[b] = c.measureText(b).width;
            e[k] =
                c.measureText(k).width
        }

        function h(a, b, c) {
            var d, e = b.text.split(/([ \f\n\r\t\v\u2028\u2029]+|\u00ad+|\u200b+)/),
                g = [],
                k = [],
                h = e.length >>> 1;
            for (d = 0; d < h; d++) g.push(e[2 * d]), k.push(e[2 * d + 1]);
            2 * d < e.length && (g.push(e[2 * d]), k.push(void 0));
            c = f[c];
            for (d = 0; d < g.length; d++) e = g[d], h = c[e], void 0 === h && (h = a.measureText(e).width, c[e] = h);
            b.Wc = g;
            b.Hf = k
        }

        function e(a) {
            for (var c = a.text.split(/\s+/), d = [], f = {
                    ".": !0,
                    ",": !0,
                    ";": !0,
                    "?": !0,
                    "!": !0,
                    ":": !0,
                    "\u3002": !0
                }, e = 0; e < c.length; e++) {
                var g = c[e];
                if (3 < g.length) {
                    for (var k = "", k =
                            k + g.charAt(0), k = k + g.charAt(1), h = 2; h < g.length - 2; h++) {
                        var m = g.charAt(h);
                        f[m] || (k += p);
                        k += m
                    }
                    k += p;
                    k += g.charAt(g.length - 2);
                    k += g.charAt(g.length - 1);
                    d.push(k)
                } else d.push(g)
            }
            a.text = d.join(b)
        }

        function c(a, b, c, d) {
            for (var f, e, g = 0; g < a.length; g++) a[g].y === b.y && (void 0 === f ? f = g : e = g);
            void 0 === e && (e = f);
            f !== e && a[e].x < a[f].x && (g = f, f = e, e = g);
            d.n = a;
            d.A = b;
            d.ed = c;
            d.Pe = f;
            d.Qe = e
        }

        function d(a, b, c, d, f, e, k) {
            var h = a.lineHeight,
                m = a.Jb,
                p = a.cc,
                s = b.Wc,
                l = c.ed,
                n = c.A,
                r = void 0,
                q = void 0;
            switch (a.verticalAlign) {
                case "top":
                    l = n.y + n.j - l.y;
                    break;
                case "bottom":
                    l = l.y - n.y;
                    break;
                default:
                    l = 2 * Math.min(l.y - n.y, n.y + n.j - l.y)
            }
            p = Math.min(l, p * c.A.j);
            if (0 >= p) k.ka = !1;
            else {
                l = d;
                f = Math.min(f, p);
                n = Math.min(1, p / Math.max(20, b.Wc.length));
                do {
                    var v = (l + f) / 2,
                        x = Math.min(s.length, Math.floor((p + v * (h - 1 - 2 * m)) / (v * h))),
                        t = void 0;
                    if (0 < x) {
                        var y = 1,
                            Y = x;
                        do {
                            var S = Math.floor((y + Y) / 2);
                            if (g(a, b, S, v, c, e && v === d && S === x, null, null)) {
                                if (Y = r = t = S, y === Y) break
                            } else if (y = S + 1, y > Y) break
                        } while (1)
                    }
                    void 0 !== t ? l = q = v : f = v
                } while (f - l > n);
                void 0 === q ? (k.ka = !1, k.fontSize = 0) : (k.ka = !0, k.fontSize = q,
                    k.$b = r, k.Pb = e && v === l)
            }
        }

        function g(a, c, d, e, g, h, m, p) {
            var l = a.Vb,
                n = e * (a.lineHeight - 1),
                q = a.Jb,
                x = f[a.fontFamily],
                t = c.Wc;
            c = c.Hf;
            var E = g.n,
                H = g.ed,
                I = g.Pe,
                L = g.Qe,
                Q;
            switch (a.verticalAlign) {
                case "top":
                    g = H.y + e / 2 + e * q;
                    Q = 1;
                    break;
                case "bottom":
                    g = H.y - (e * d + n * (d - 1)) + e / 2 - e * q;
                    Q = -1;
                    break;
                default:
                    g = H.y - (e * (d - 1) / 2 + n * (d - 1) / 2), Q = 1
            }
            a = g;
            for (q = 0; q < d; q++) r[2 * q] = g - e / 2, r[2 * q + 1] = g + e / 2, g += Q * e, g += Q * n;
            for (; s.length < r.length;) s.push(Array(2));
            q = r;
            g = 2 * d;
            Q = s;
            for (var R = E.length, Y = I, I = (I - 1 + R) % R, S = L, L = (L + 1) % R, ba = 0; ba < g;) {
                for (var ia = q[ba],
                        ja = E[I]; ja.y < ia;) Y = I, I = (I - 1 + R) % R, ja = E[I];
                for (var ea = E[L]; ea.y < ia;) S = L, L = (L + 1) % R, ea = E[L];
                var ka = E[Y],
                    la = E[S],
                    ea = la.x + (ea.x - la.x) * (ia - la.y) / (ea.y - la.y);
                Q[ba][0] = ka.x + (ja.x - ka.x) * (ia - ka.y) / (ja.y - ka.y);
                Q[ba][1] = ea;
                ba++
            }
            for (q = 0; q < d; q++) E = 2 * q, g = H.x, Q = g - s[E][0], R = s[E][1] - g, Q = Q < R ? Q : R, R = g - s[E + 1][0], E = s[E + 1][1] - g, E = R < E ? R : E, v[q] = 2 * (Q < E ? Q : E) - l * e;
            Y = x[b] * e / y;
            Q = x[k] * e / y;
            l = 0;
            I = v[l];
            H = 0;
            E = void 0;
            for (q = 0; q < t.length; q++) {
                g = t[q];
                S = c[q];
                R = x[g] * e / y;
                if (H + R < I && t.length - q >= d - l) H += R, " " === S && (H += Y), m && m(g, E);
                else {
                    if (R > I &&
                        (l !== d - 1 || !h)) return !1;
                    if (l + 1 >= d) {
                        if (h) {
                            d = I - H - Q;
                            if (d > Q || R > Q) d = Math.floor(g.length * d / R), 0 < d && m && m(g.substring(0, d), E);
                            m && m(k, void 0);
                            p && p(l, a, g, E, H);
                            return !0
                        }
                        return !1
                    }
                    l++;
                    p && p(l, a, g, E, H);
                    a += e;
                    a += n;
                    I = v[l];
                    H = R;
                    " " === S && (H += Y);
                    if (R > I && (l !== d || !h)) return !1
                }
                E = S
            }
            p && p(l, a, void 0, void 0, H);
            return !0
        }
        var m = {
            bc: 72,
            Jc: 0,
            lineHeight: 1.05,
            Vb: 1,
            Jb: 0.5,
            cc: 0.9,
            fontFamily: "sans-serif",
            verticalAlign: "center"
        }, f = {}, b = " ",
            k = "\u2026",
            n = "\u2010",
            q = "\u00ad",
            p = "\u200b",
            r = [],
            s = [],
            v = [],
            t = {
                text: "",
                Wc: void 0,
                Hf: void 0
            }, x = {
                n: void 0,
                A: void 0,
                ed: void 0,
                Pe: 0,
                Qe: 0
            }, y = 100;
        return {
            le: a,
            ae: function(b, c, d, f, e, g, k, h, m, p, l, s) {
                var n, q = 0,
                    r = 0;
                d = d.toString().trim();
                !s && m.result && d === m.Of && Math.abs(p - m.$d) / p <= l && (n = m.result, n.ka && (q = g.x - m.Vf, r = g.y - m.Wf, l = m.Tc, c.save(), c.translate(q, r), l.Na(c), c.restore()));
                n || (l = m.Tc, l.clear(), n = a(b, l, d, f, e, g, k, h), n.ka && l.Na(c), m.$d = p, m.Vf = g.x, m.Wf = g.y, m.result = n, m.Of = d);
                return n.ka ? {
                    ka: !0,
                    $b: n.$b,
                    fontSize: n.fontSize,
                    X: {
                        x: n.X.x + q,
                        y: n.X.y + r,
                        f: n.X.f,
                        j: n.X.j
                    },
                    Pb: n.Pb
                } : {
                    ka: !1
                }
            },
            Nh: function() {
                return {
                    $d: 0,
                    Vf: 0,
                    Wf: 0,
                    result: void 0,
                    Tc: new da,
                    Of: void 0
                }
            },
            Pa: m
        }
    }();
    var Da = new function() {
            this.hg = function(a, l) {
                function h(a, b, d, f, e) {
                    if (0 != a.length) {
                        var g = a.shift(),
                            k = c(g),
                            m, l, n, z;
                        if (f < e) {
                            m = b;
                            k = k / f;
                            do {
                                l = g.shift();
                                n = l.nb;
                                z = n / k;
                                n = d;
                                var C = k;
                                l.x = m + z / 2;
                                l.y = n + C / 2;
                                m += z
                            } while (0 < g.length);
                            return h(a, b, d + k, f, e - k)
                        }
                        m = d;
                        z = k / e;
                        do l = g.shift(), n = l.nb, k = n / z, n = m, C = k, l.x = b + z / 2, l.y = n + C / 2, m += k; while (0 < g.length);
                        return h(a, b + z, d, f - z, e)
                    }
                }

                function e(a, b, d, f) {
                    function g(a, b) {
                        for (var d = c(a), d = d * d, f = b * b, e = Math.max(f * a[0].nb / d, d / (f * a[0].nb)), k = 1; k < a.length; k++) e = Math.max(e, Math.max(f * a[k].nb /
                            d, d / (f * a[k].nb)));
                        return e
                    }
                    if (0 != a.length) {
                        var k = f[f.length - 1],
                            m = b < d ? b : d,
                            h = b < d ? d : b,
                            l = a.shift(),
                            n = g(k, m);
                        k.push(l);
                        var z = g(k, m);
                        n >= z ? e(a, b, d, f) : (k.pop(), f.push([l]), e(a, m, h - c(k) / m, f));
                        return f
                    }
                }

                function c(a) {
                    for (var b = 0, c = 0; c < a.length; c++) b += a[c].nb;
                    return b
                }
                var d = l.x,
                    g = l.y,
                    m = l.f,
                    f = l.j;
                if (0 != a.length)
                    if (1 == a.length) a[0].x = d + m / 2, a[0].y = g + f / 2, a[0].Wb = 0;
                    else {
                        for (var b = a.slice(0), k = 0, n = 0; n < b.length; n++) k += b[n].V;
                        k = m * f / k;
                        for (n = 0; n < b.length; n++) b[n].nb = b[n].V * k;
                        b.sort(function(a, b) {
                            return a.Wb - b.Wb
                        });
                        b =
                            e(b, m, f, [
                                [b.shift()]
                            ]);
                        h(b, d, g, m, f)
                    }
            }
        };

    function Ea(a) {
        var l = {}, h = a.Bd,
            e;
        a.d.i("model:loaded", function(a) {
            e = a
        });
        this.u = function() {
            a.d.p("api:initialized", this)
        };
        this.dd = function(a, d, e, m) {
            this.Yc(l, d);
            this.Zc(l, d);
            this.Xc(l, d, !1);
            m && m(l);
            a(h, l, e)
        };
        this.cd = function(a, d, g, m, f, b, k) {
            if (a) {
                for (a = d.length - 1; 0 <= a; a--) {
                    var h = d[a],
                        l = G.extend({
                            group: h.group
                        }, f);
                    l[g] = m(h);
                    b(l)
                }
                0 < d.length && k(G.extend({
                    groups: $.zc(e, m).map(function(a) {
                        return a.group
                    })
                }, f))
            }
        };
        this.Zc = function(a, d) {
            a.selected = d.selected;
            a.hovered = d.vb;
            a.open = d.open;
            a.openness = d.Bb;
            a.exposed =
                d.Q;
            a.exposure = d.ja;
            a.transitionProgress = d.qa;
            a.revealed = !d.aa.Ia();
            a.browseable = d.Ma ? d.T : void 0;
            a.visible = d.ca;
            a.labelDrawn = d.la && d.la.ka;
            return a
        };
        this.Yc = function(a, d) {
            var e = d.parent;
            a.group = d.group;
            a.parent = e && e.group;
            a.weightNormalized = d.Tf;
            a.level = d.ya - 1;
            a.siblingCount = e && e.e.length;
            a.hasChildren = !d.empty();
            a.index = d.index;
            a.indexByWeight = d.Wb;
            return a
        };
        this.Xc = function(a, d, e) {
            a.polygonCenterX = d.da.x;
            a.polygonCenterY = d.da.y;
            a.polygonArea = d.da.fa;
            a.boxLeft = d.A.x;
            a.boxTop = d.A.y;
            a.boxWidth = d.A.f;
            a.boxHeight = d.A.j;
            if (d.la && d.la.ka) {
                var m = d.la.X;
                a.labelBoxLeft = m.x;
                a.labelBoxTop = m.y;
                a.labelBoxWidth = m.f;
                a.labelBoxHeight = m.j;
                a.labelFontSize = d.la.fontSize
            }
            if (e && d.pa) {
                e = [];
                d = d.pa;
                for (var m = d.length, f = 0; f < m; f++) {
                    var b = d[f];
                    e.push({
                        x: b.x,
                        y: b.y
                    })
                }
                a.polygon = e
            }
            return a
        }
    };
    var na = new function() {
            var a = window.console;
            this.va = function(a) {
                throw "FoamTree: " + a;
            };
            this.info = function(l) {
                a.info("FoamTree: " + l)
            };
            this.warn = function(l) {
                a.warn("FoamTree: " + l)
            }
        };

    function Fa(a) {
        function l(b, d) {
            b.e = [];
            b.Oa = !0;
            for (var f = c(d), e = 0; e < d.length; e++) {
                var g = d[e],
                    k = G.F(g.weight, 1);
                if (0 >= k)
                    if (a.Ii) k = 0.9 * f;
                    else continue;
                g = h(g);
                g.V = k;
                g.index = e;
                g.parent = b;
                g.ya = b.ya + 1;
                b.e.push(g)
            }
        }

        function h(a) {
            var b = new Ga;
            e(a);
            b.id = a.__id;
            b.group = a;
            return n[a.__id] = b
        }

        function e(a) {
            G.N(a, "__id") || (Object.defineProperty(a, "__id", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: k
            }), k++)
        }

        function c(a) {
            for (var b = Number.MAX_VALUE, c = 0; c < a.length; c++) {
                var d = a[c].weight;
                0 < d && b > d && (b = d)
            }
            b === Number.MAX_VALUE &&
                (b = 1);
            return b
        }

        function d(a) {
            if (!a.empty()) {
                a = a.e;
                var b;
                for (b = a.length - 1; 0 <= b; b--);
                for (b = a.length - 1; 0 <= b; b--) {
                    var c = a[b];
                    c.Tf = c.V / 0
                }
            }
        }

        function g(a) {
            if (!a.empty()) {
                a = a.e.slice(0).sort(function(a, b) {
                    return a.V < b.V ? 1 : a.V > b.V ? -1 : a.index - b.index
                });
                for (var b = 0; b < a.length; b++) a[b].Wb = b
            }
        }

        function m() {
            for (var a = b.e.reduce(function(a, b) {
                return a + b.V
            }, 0), c = 0; c < b.e.length; c++) {
                var d = b.e[c];
                d.Ga && (d.V = 0.025 * a)
            }
        }
        var f = this,
            b = new Ga,
            k, n, q, p, r;
        this.u = function() {
            return b
        };
        this.J = function(c) {
            var f = c.group.groups,
                e =
                    a.Fh;
            return !c.e && f && 0 < f.length && r + f.length <= e ? (r += f.length, l(c, f), d(b), g(b), !0) : !1
        };
        this.na = function(a) {
            function c(a) {
                var b = a.groups;
                if (b)
                    for (var d = 0; d < b.length; d++) {
                        var f = b[d];
                        e(f);
                        var g = f.__id;
                        n[g] = null;
                        p[g] = a;
                        g = f.id;
                        G.R(g) || (q[g] = f);
                        c(f)
                    }
            }

            function f(a, b) {
                if (!a) return b;
                var c = Math.max(b, a.__id || 0),
                    d = a.groups;
                if (d && 0 < d.length)
                    for (var e = d.length - 1; 0 <= e; e--) c = f(d[e], c);
                return c
            }
            b.group = a;
            b.Ea = !1;
            b.T = !1;
            b.Ma = !1;
            b.open = !0;
            b.Bb = 1;
            k = f(a, 0) + 1;
            n = {};
            q = {};
            p = {};
            r = 0;
            a && (e(a), n[a.__id] = b, G.R(a.id) || (q[a.id] =
                a), c(a));
            l(b, a && a.groups || []);
            (function(a) {
                if (!a.empty()) {
                    var b = h({
                        attribution: !0
                    });
                    b.index = a.e.length;
                    b.parent = a;
                    b.ya = a.ya + 1;
                    b.Ga = !0;
                    a.e.push(b)
                }
            })(b);
            d(b);
            g(b);
            m()
        };
        this.update = function() {
            $.Ha(b, function(a) {
                if (!a.empty()) {
                    a = a.e;
                    for (var b = c(a.map(function(a) {
                        return a.group
                    })), d = 0; d < a.length; d++) {
                        var f = a[d];
                        f.V = 0 <= f.group.weight ? f.group.weight : 0.9 * b
                    }
                }
            });
            d(b);
            g(b);
            m()
        };
        this.o = function(a) {
            return function() {
                if (G.R(a) || G.Ke(a)) return [];
                if (Array.isArray(a)) return a.map(f.c, f);
                if (G.Xb(a)) {
                    if (G.N(a, "all")) {
                        var c = [];
                        $.C(b, function(a) {
                            c.push(a)
                        });
                        return c
                    }
                    if (G.N(a, "__id")) return [f.c(a)];
                    if (G.N(a, "groups")) return f.o(a.groups)
                }
                return [f.c(a)]
            }().filter(function(a) {
                return void 0 !== a
            })
        };
        this.c = function(a) {
            if (G.Xb(a) && G.N(a, "__id")) {
                if (a = a.__id, G.N(n, a)) {
                    if (null === n[a]) {
                        for (var b = p[a], c = []; b;) {
                            b = b.__id;
                            c.push(b);
                            if (n[b]) break;
                            b = p[b]
                        }
                        for (b = c.length - 1; 0 <= b; b--) this.J(n[c[b]])
                    }
                    return n[a]
                }
            } else if (G.N(q, a)) return this.c(q[a])
        };
        this.k = function(a, b, c) {
            return {
                e: f.o(a),
                Aa: G.F(a && a[b], !0),
                xa: G.F(a && a.keepPrevious, c)
            }
        }
    }

    function Ha(a, l, h) {
        var e = {};
        l.xa && $.C(a, function(a) {
            h(a) && (e[a.id] = a)
        });
        a = l.e;
        l = l.Aa;
        for (var c = a.length - 1; 0 <= c; c--) {
            var d = a[c];
            e[d.id] = l ? d : void 0
        }
        var g = [];
        G.Ca(e, function(a) {
            void 0 !== a && g.push(a)
        });
        return g
    };

    function Ia(a) {
        function l(a, b) {
            var c = a.ja;
            b.opacity = 1;
            b.Fa = 1;
            b.sa = 0 > c ? 1 - p.uh / 100 * c : 1;
            b.ta = 0 > c ? 1 - p.vh / 100 * c : 1;
            b.Z = 0 > c ? 1 + 0.5 * c : 1
        }

        function h(a) {
            a = a.ja;
            return Math.max(0.001, 0 === a ? 1 : 1 + a * (p.gb - 1))
        }

        function e(a, b) {
            for (var c = a.reduce(function(a, b) {
                a[b.id] = b;
                return a
            }, {}), d = a.length - 1; 0 <= d; d--) $.C(a[d], function(a) {
                c[a.id] = void 0
            });
            var f = [];
            G.Ca(c, function(a) {
                a && $.ge(a, function(a) {
                    a.open || f.push(a)
                })
            });
            var e = [];
            G.Ca(c, function(a) {
                a && a.open && e.push(a)
            });
            d = [];
            0 !== f.length && d.push(y.jb({
                e: f,
                Aa: !0,
                xa: !0
            }, b, !0));
            return pa(d)
        }

        function c(c, e, h, l) {
            var n = m();
            if (0 === c.length && !n) return (new X).I().M();
            var q = c.reduce(function(a, b) {
                a[b.id] = !0;
                return a
            }, {}),
                s = [];
            c = [];
            if (A.reduce(function(a, b) {
                return a || q[b.id] && (!b.Q || 1 !== b.ja) || !q[b.id] && !b.parent.Q && (b.Q || -1 !== b.ja)
            }, !1)) {
                var y = [],
                    z = {};
                A.forEach(function(a) {
                    q[a.id] && (a.Q || s.push(a), a.Q = !0, $.Ha(a, function(a) {
                        y.push(b(a, 1));
                        z[a.id] = !0
                    }))
                });
                0 < y.length ? ($.C(r, function(a) {
                        q[a.id] || (a.Q && s.push(a), a.Q = !1);
                        z[a.id] || y.push(b(a, -1))
                    }), c.push(x.B.m({}).Ua(y).call(k).Xa()),
                    d(q), c.push(g(n)), h && (t.gc(B, p.Ec, p.Qa, Z.ha(p.Rb)), t.Eb())) : (c.push(f(h)), e && $.C(r, function(a) {
                    a.Q && s.push(a)
                }))
            }
            return pa(c).K(function() {
                v.cd(e, s, "exposed", function(a) {
                    return a.Q
                }, {
                    indirect: l
                }, a.options.$e, a.options.Ze)
            })
        }

        function d(a) {
            A.reduce(n(!0, void 0, function(b) {
                return b.Q || a[b.id]
            }), q(B));
            B.x -= B.f * (p.gb - 1) / 2;
            B.y -= B.j * (p.gb - 1) / 2;
            B.f *= p.gb;
            B.j *= p.gb
        }

        function g(b) {
            if (b || !t.zd()) return x.B.m(s).ba({
                duration: 0.7 * p.Qa,
                D: {
                    x: {
                        end: B.x + B.f / 2,
                        L: Z.ha(p.Rb)
                    },
                    y: {
                        end: B.y + B.j / 2,
                        L: Z.ha(p.Rb)
                    }
                },
                W: function() {
                    a.d.p("foamtree:dirty", !0)
                }
            }).Xa();
            s.x = B.x + B.f / 2;
            s.y = B.y + B.j / 2;
            return (new X).I().M()
        }

        function m() {
            return !!A && A.reduce(function(a, b) {
                return a || 0 !== b.ja
            }, !1)
        }

        function f(a) {
            var c = [],
                d = [];
            $.C(r, function(a) {
                0 !== a.ja && d.push(b(a, 0, function() {
                    this.Q = !1
                }))
            });
            c.push(x.B.m({}).Ua(d).Xa());
            t.content(0, 0, z, C);
            a && (c.push(t.reset(p.Qa, Z.ha(p.Rb))), t.Eb());
            return pa(c)
        }

        function b(b, c, d) {
            var f = x.B.m(b);
            0 === b.ja && 0 !== c && f.call(function() {
                this.sc(K);
                this.qb(l)
            });
            f.ba({
                duration: p.Qa,
                D: {
                    ja: {
                        end: c,
                        L: Z.ha(p.Rb)
                    }
                },
                W: function() {
                    r.H = !0;
                    r.cb = !0;
                    a.d.p("foamtree:dirty", !0)
                }
            });
            0 === c && f.call(function() {
                this.ud();
                this.ac();
                this.Qc(K);
                this.Pc(l)
            });
            return f.call(d).ua()
        }

        function k() {
            var a = r.e.reduce(n(!1, K.hc, void 0), q({})).X,
                b = p.Ec,
                c = Math.min(a.x, B.x - B.f * b),
                d = Math.max(a.x + a.f, B.x + B.f * (1 + b)),
                f = Math.min(a.y, B.y - B.j * b),
                a = Math.max(a.y + a.j, B.y + B.j * (1 + b));
            t.content(c, f, d - c, a - f)
        }

        function n(a, b, c) {
            var d = {};
            return function(f, e) {
                if (!c || c(e)) {
                    for (var g = a ? e.pa || e.n : e.n, k, h = g.length - 1; 0 <= h; h--) k = void 0 !== b ? b(e, g[h], d) : g[h], f.Kc = Math.min(f.Kc, k.x), f.wd = Math.max(f.wd,
                        k.x), f.Lc = Math.min(f.Lc, k.y), f.xd = Math.max(f.xd, k.y);
                    f.X.x = f.Kc;
                    f.X.y = f.Lc;
                    f.X.f = f.wd - f.Kc;
                    f.X.j = f.xd - f.Lc
                }
                return f
            }
        }

        function q(a) {
            return {
                Kc: Number.MAX_VALUE,
                wd: Number.MIN_VALUE,
                Lc: Number.MAX_VALUE,
                xd: Number.MIN_VALUE,
                X: a
            }
        }
        var p = a.options,
            r, s, v, t, x, y, A, B, z, C, K = {
                Oe: function(a, b) {
                    b.scale = h(a);
                    return !1
                },
                Ib: function(a, b) {
                    var c = h(a),
                        d = s.x,
                        f = s.y;
                    b.translate(d, f);
                    b.scale(c, c);
                    b.translate(-d, -f)
                },
                ic: function(a, b, c) {
                    a = h(a);
                    var d = s.x,
                        f = s.y;
                    c.x = (b.x - d) / a + d;
                    c.y = (b.y - f) / a + f
                },
                hc: function(a, b, c) {
                    a = h(a);
                    var d = s.x,
                        f = s.y;
                    c.x = (b.x - d) * a + d;
                    c.y = (b.y - f) * a + f;
                    return c
                }
            };
        a.d.i("stage:initialized", function(a, b, c, d) {
            s = {
                x: c / 2,
                y: d / 2
            };
            z = c;
            C = d;
            B = {
                x: 0,
                y: 0,
                f: z,
                j: C
            }
        });
        a.d.i("stage:resized", function(a, b, c, d) {
            s.x *= c / a;
            s.y *= d / b;
            z = c;
            C = d
        });
        a.d.i("api:initialized", function(a) {
            v = a
        });
        a.d.i("zoom:initialized", function(a) {
            t = a
        });
        a.d.i("model:loaded", function(a, b) {
            r = a;
            A = b
        });
        a.d.i("model:childrenAttached", function(a) {
            A = a
        });
        a.d.i("timeline:initialized", function(a) {
            x = a
        });
        a.d.i("openclose:initialized", function(a) {
            y = a
        });
        var O = ["groupExposureScale",
            "groupUnexposureScale", "groupExposureZoomMargin"
        ];
        a.d.i("options:changed", function(a) {
            G.hb(a, O) && m() && (d({}), t.Pi(B, p.Ec), t.Eb())
        });
        this.u = function() {
            a.d.p("expose:initialized", this)
        };
        this.Qb = function(a, b, d, f) {
            var g = a.e.reduce(function(a, b) {
                for (var c = b; c = c.parent;) a[c.id] = !0;
                return a
            }, {}),
                k = Ha(r, a, function(a) {
                    return a.Q && !a.open && !g[a.id]
                }),
                h = new X;
            e(k, b).K(function() {
                c(k.filter(function(a) {
                    return a.n && a.pa
                }), b, d, f).K(h.I)
            });
            return h.M()
        }
    };

    function Ja(a) {
        function l(c) {
            function b(a, b) {
                var c = Math.min(1, Math.max(0, a.qa));
                b.opacity = c;
                b.sa = 1;
                b.ta = c;
                b.Fa = c;
                b.Z = a.xb
            }
            var k = a.options,
                h = k.Di,
                l = k.Ei,
                p = k.Ai,
                r = k.Bi,
                s = k.Ci,
                v = k.Md,
                t = h + l + p + r + s,
                x = 0 < t ? v / t : 0,
                y = [];
            m.$a(k.Df, k.Cf, k.Ef, k.Ff, k.Bf);
            if (0 === x && c.e && c.T) {
                v = c.e;
                for (t = 0; t < v.length; t++) {
                    var A = v[t];
                    A.qa = 1;
                    A.xb = 1;
                    A.qb(b);
                    A.ac();
                    A.Pc(b)
                }
                c.H = !0;
                a.d.p("foamtree:dirty", 0 < x);
                return (new X).I().M()
            }
            if (c.e && c.T) {
                Ca.Da(c, Ca.na(c, a.options.Od), function(c, d, f) {
                    c.sc(m);
                    c.qb(b);
                    f = "groups" === a.options.Nd ? f : d;
                    d =
                        e.B.m(c).Za(f * x * h).ba({
                            duration: x * l,
                            D: {
                                qa: {
                                    end: 1,
                                    L: Z.ha(k.zi)
                                }
                            },
                            W: function() {
                                this.H = !0;
                                a.d.p("foamtree:dirty", 0 < x)
                            }
                        }).ua();
                    f = e.B.m(c).Za(g ? x * (p + f * r) : 0).ba({
                        duration: g ? x * s : 0,
                        D: {
                            xb: {
                                end: 1,
                                L: Z.zb
                            }
                        },
                        W: function() {
                            this.H = !0;
                            a.d.p("foamtree:dirty", 0 < x)
                        }
                    }).ua();
                    c = e.B.m(c).Ua([d, f]).Vd().bb(function() {
                        this.ud();
                        this.ac();
                        this.Qc(m);
                        this.Pc(b)
                    }).ua();
                    y.push(c)
                });
                d.c();
                var B = new X;
                e.B.m({}).Ua(y).call(function() {
                    d.k();
                    B.I()
                }).start();
                return B.M()
            }
            return (new X).I().M()
        }
        var h, e, c = [],
            d = new qa(G.La);
        a.d.i("stage:initialized",
            function() {});
        a.d.i("stage:resized", function() {});
        a.d.i("stage:newLayer", function(a, b) {
            c.push(b)
        });
        a.d.i("model:loaded", function(a) {
            h = a;
            d.clear()
        });
        a.d.i("zoom:initialized", function() {});
        a.d.i("timeline:initialized", function(a) {
            e = a
        });
        var g = !1;
        a.d.i("render:renderers:resolved", function(a) {
            g = a.labelPlainFill || !1
        });
        var m = new function() {
                var a = 0,
                    b = 0,
                    c = 0,
                    d = 0,
                    e = 0,
                    g = 0;
                this.$a = function(h, m, l, t, x) {
                    a = 1 + m;
                    b = 1 - a;
                    c = l;
                    d = t;
                    e = x;
                    g = h
                };
                this.Oe = function(g, h) {
                    h.scale = a + b * g.qa;
                    return 0 !== e || 0 !== c || 0 !== d
                };
                this.Ib = function(h,
                    m) {
                    var l = a + b * h.qa,
                        t = h.parent,
                        x = g * h.x + (1 - g) * t.x,
                        y = g * h.y + (1 - g) * t.y;
                    m.translate(x, y);
                    m.scale(l, l);
                    l = 1 - h.qa;
                    m.rotate(e * Math.PI * l);
                    m.translate(-x, -y);
                    m.translate(t.A.f * c * l, t.A.j * d * l)
                };
                this.ic = function(e, h, m) {
                    var l = a + b * e.qa,
                        q = g * e.x + (1 - g) * e.parent.x,
                        y = g * e.y + (1 - g) * e.parent.y,
                        A = 1 - e.qa;
                    e = e.parent;
                    m.x = (h.x - q) / l + q - e.A.f * c * A;
                    m.y = (h.y - y) / l + y - e.A.j * d * A
                };
                this.hc = function(e, h, m) {
                    var l = a + b * e.qa,
                        q = g * e.x + (1 - g) * e.parent.x,
                        y = g * e.y + (1 - g) * e.parent.y,
                        A = 1 - e.qa;
                    e = e.parent;
                    m.x = (h.x - q) * l + q - e.A.f * c * A;
                    m.y = (h.y - y) * l + y - e.A.j * d * A
                }
            };
        this.u = function() {};
        this.k = function() {
            function c(a, b) {
                var d = Math.min(1, Math.max(0, a.qa));
                b.opacity = d;
                b.sa = 1;
                b.ta = d;
                b.Fa = d;
                b.Z = a.xb
            }

            function b(a, b) {
                var c = Math.min(1, Math.max(0, a.Gd));
                b.opacity = c;
                b.Fa = c;
                b.sa = 1;
                b.ta = 1;
                b.Z = a.xb
            }
            var k = a.options,
                l = k.Fd,
                q = k.Xh,
                p = k.Yh,
                r = k.Zh,
                s = k.Th,
                v = k.Uh,
                t = k.Vh,
                x = k.Ph,
                y = k.Qh,
                A = k.Rh,
                B = s + v + t + x + y + A + q + p + r,
                z = 0 < B ? l / B : 0,
                C = [];
            d.o() ? m.$a(k.ci, k.ai, k.di, k.ei, k.$h) : m.$a(k.Df, k.Cf, k.Ef, k.Ff, k.Bf);
            Ca.Da(h, Ca.na(h, a.options.bi), function(d, h, l) {
                var n = "groups" === a.options.Wh ? l : h;
                C.push(e.B.m(d).call(function() {
                    this.qb(c)
                }).Za(g ?
                    z * (s + n * v) : 0).ba({
                    duration: g ? z * t : 0,
                    D: {
                        xb: {
                            end: 0,
                            L: Z.zb
                        }
                    },
                    W: function() {
                        this.H = !0;
                        a.d.p("foamtree:dirty", !0)
                    }
                }).ua());
                $.C(d, function(c) {
                    C.push(e.B.m(c).call(function() {
                        this.sc(m);
                        this.qb(b)
                    }).Za(z * (x + y * n)).ba({
                        duration: z * A,
                        D: {
                            Gd: {
                                end: 0,
                                L: Z.zb
                            }
                        },
                        W: function() {
                            this.H = !0;
                            a.d.p("foamtree:dirty", !0)
                        }
                    }).bb(function() {
                        this.selected = !1;
                        this.Qc(m)
                    }).ua())
                });
                C.push(e.B.m(d).call(function() {
                    this.sc(m)
                }).Za(z * (q + p * n)).ba({
                    duration: z * r,
                    D: {
                        qa: {
                            end: 0,
                            L: Z.ha(k.Sh)
                        }
                    },
                    W: function() {
                        this.H = !0;
                        a.d.p("foamtree:dirty", !0)
                    }
                }).bb(function() {
                    this.selected = !1;
                    this.Qc(m)
                }).ua())
            });
            return e.B.m({}).Ua(C).Xa()
        };
        this.c = function(a) {
            return l(a)
        }
    };

    function Ka(a) {
        function l(a, b) {
            var c = [];
            $.C(g, function(b) {
                if (b.e) {
                    var d = G.N(a, b.id);
                    b.open !== d && (d || b.Q || $.C(b, function(a) {
                        if (a.Q) return c.push(b), !1
                    }))
                }
            });
            if (0 === c.length) return (new X).I().M();
            var e;
            for (e = c.length - 1; 0 <= e; e--) c[e].open = !1;
            var h = d.Qb({
                e: c,
                Aa: !0,
                xa: !0
            }, b, !0, !0);
            for (e = c.length - 1; 0 <= e; e--) c[e].open = !0;
            return h
        }

        function h(d, b, k) {
            function h(b, d) {
                b.qb(l);
                var f = c.B.m(b).ba({
                    duration: a.options.Nc,
                    D: {
                        Bb: {
                            end: d ? 1 : 0,
                            L: Z.ce
                        }
                    },
                    W: function() {
                        this.H = !0;
                        a.d.p("foamtree:dirty", !0)
                    }
                }).call(function() {
                    this.open =
                        d;
                    b.lc = !1
                }).bb(function() {
                    this.ac();
                    this.Pc(l);
                    delete e[this.id]
                }).ua();
                return e[b.id] = f
            }

            function l(a, b) {
                b.opacity = 1 - a.Bb;
                b.sa = 1;
                b.ta = 1;
                b.Z = 1;
                b.Fa = 1
            }
            var p = [],
                r = [];
            $.C(g, function(a) {
                if (a.T && a.Y) {
                    var b = G.N(d, a.id),
                        c = e[a.id];
                    if (c && c.wb()) c.stop();
                    else if (a.open === b) return;
                    a.lc = b;
                    b || (a.open = b, a.Ad = !1);
                    r.push(a);
                    p.push(h(a, b))
                }
            });
            return 0 < p.length ? (a.d.p("openclose:changing"), c.B.m({}).Ua(p).Xa().K(function() {
                m.cd(b, r, "open", function(a) {
                    return a.open
                }, {
                    indirect: k
                }, a.options.ff, a.options.ef)
            })) : (new X).I().M()
        }
        var e, c, d, g, m;
        a.d.i("api:initialized", function(a) {
            m = a
        });
        a.d.i("model:loaded", function(a) {
            g = a;
            e = {}
        });
        a.d.i("timeline:initialized", function(a) {
            c = a
        });
        a.d.i("expose:initialized", function(a) {
            d = a
        });
        this.u = function() {
            a.d.p("openclose:initialized", this)
        };
        this.jb = function(c, b, d) {
            c = Ha(g, c, function(a) {
                return a.open
            });
            for (var e = new X, m = 0; m < c.length; m++) c[m].lc = !0;
            0 < c.length && a.d.p("foamtree:attachChildren");
            var p = c.reduce(function(a, b) {
                a[b.id] = !0;
                return a
            }, {});
            l(p, b).K(function() {
                h(p, b, d).K(e.I)
            });
            return e.M()
        }
    };

    function La(a) {
        function l(c, d) {
            var g = Ha(h, c, function(a) {
                return a.selected
            });
            $.C(h, function(a) {
                !0 === a.selected && (a.selected = !a.selected, a.H = !a.H)
            });
            var m;
            for (m = g.length - 1; 0 <= m; m--) {
                var f = g[m];
                f.selected = !f.selected;
                f.H = !f.H
            }
            var b = [];
            $.C(h, function(a) {
                a.H && b.push(a)
            });
            0 < b.length && a.d.p("foamtree:dirty", !1);
            e.cd(d, b, "selected", function(a) {
                return a.selected
            }, {}, a.options.hf, a.options.gf)
        }
        var h, e;
        a.d.i("api:initialized", function(a) {
            e = a
        });
        a.d.i("model:loaded", function(a) {
            h = a
        });
        this.u = function() {
            a.d.p("select:initialized",
                this)
        };
        this.select = function(a, d) {
            return l(a, d)
        }
    };

    function Ma(a) {
        function l(a) {
            return function(b) {
                a.call(this, {
                    x: b.x,
                    y: b.y,
                    scale: b.scale,
                    fd: b.delta,
                    ctrlKey: b.ctrlKey,
                    metaKey: b.metaKey,
                    altKey: b.altKey,
                    shiftKey: b.shiftKey,
                    Fb: b.secondary,
                    touches: b.touches
                })
            }
        }

        function h() {
            function c(a) {
                return function(b) {
                    b.x *= N / n.clientWidth;
                    b.y *= W / n.clientHeight;
                    return a(b)
                }
            }
            "external" !== k.Ge && (P = new ta(n), T = new sa, w.Fe() || (P.wa(c(b.wa)), P.Ka(c(b.wa)), P.za(c(b.Ka)), T.addEventListener("keyup", function(b) {
                var c = !1,
                    d = void 0,
                    e = k.mf({
                        keyCode: b.keyCode,
                        preventDefault: function() {
                            c = !0
                        },
                        preventOriginalEventDefault: function() {
                            d = "prevent"
                        },
                        allowOriginalEventDefault: function() {
                            d = "allow"
                        }
                    });
                "prevent" === d && b.preventDefault();
                (c = c || 0 <= e.indexOf(!1)) || 27 === b.keyCode && a.d.p("interaction:reset")
            })), "hammerjs" === k.Ge && G.N(window, "Hammer") ? (E.u(n), E.m("tap", c(b.c), !0), E.m("doubletap", c(b.k), !0), E.m("hold", c(b.va), !0), E.m("touch", c(b.za), !1), E.m("dragstart", c(b.na), !0), E.m("drag", c(b.o), !0), E.m("dragend", c(b.J), !0), E.m("transformstart", c(b.Ya), !0), E.m("transform", c(b.Da), !0), E.m("transformend",
                c(b.Va), !0)) : (P.c(c(b.c)), P.k(c(b.k)), P.va(c(b.va)), P.Da(c(b.za)), P.na(c(b.na)), P.o(c(b.o)), P.J(c(b.J))))
        }

        function e() {
            q.vc(2) ? a.d.p("interaction:reset") : q.normalize(k.mc, Z.ha(k.nc))
        }

        function c(a) {
            return function() {
                x.empty() || a.apply(this, arguments)
            }
        }

        function d(a, b, c) {
            return function(d) {
                var e;
                switch (a) {
                    case "click":
                        e = k.Ue;
                        break;
                    case "doubleclick":
                        e = k.Ve;
                        break;
                    case "hold":
                        e = k.af;
                        break;
                    case "hover":
                        e = k.bf;
                        break;
                    case "mousewheel":
                        e = k.df;
                        break;
                    case "mousedown":
                        e = k.cf;
                        break;
                    case "dragstart":
                        e = k.Ye;
                        break;
                    case "drag":
                        e = k.We;
                        break;
                    case "dragend":
                        e = k.Xe;
                        break;
                    case "transformstart":
                        e = k.lf;
                        break;
                    case "transform":
                        e = k.jf;
                        break;
                    case "transformend":
                        e = k.kf
                }
                var f = !1,
                    h = !e.empty(),
                    l = q.absolute(d),
                    p = (b || h) && g(l, 0),
                    l = (b || h) && m(l);
                h && (h = p ? p.group : null, d.Cb = void 0, e = e({
                    type: a,
                    group: h,
                    topmostClosedGroup: h,
                    bottommostOpenGroup: l ? l.group : null,
                    x: d.x,
                    y: d.y,
                    scale: G.F(d.scale, 1),
                    secondary: d.Fb,
                    touches: G.F(d.touches, 1),
                    delta: G.F(d.fd, 0),
                    ctrlKey: d.ctrlKey,
                    metaKey: d.metaKey,
                    altKey: d.altKey,
                    shiftKey: d.shiftKey,
                    preventDefault: function() {
                        f = !0
                    },
                    preventOriginalEventDefault: function() {
                        d.Cb = "prevent"
                    },
                    allowOriginalEventDefault: function() {
                        d.Cb = "allow"
                    }
                }), f = f || 0 <= e.indexOf(!1), p && p.Ga && "click" === a && (f = !1));
                f || c({
                    tc: p,
                    pg: l
                }, d)
            }
        }

        function g(a, b) {
            for (var c = M.length, d = void 0, e = 0; e < c; e++) {
                var f = M[e];
                f.scale > b && !1 === f.open && f.ca && H(f, a) && (d = f, b = f.scale)
            }
            return d
        }

        function m(a) {
            var b = void 0,
                c = 0;
            $.xc(x, function(d) {
                !0 === d.open && d.ca && d.scale > c && H(d, a) && (b = d, c = d.scale)
            });
            return b
        }
        var f = w.Je(),
            b = this,
            k = a.options,
            n, q, p, r, s, v, t, x, y, A, B, z, C, K, O, P, T, N, W;
        a.d.i("stage:initialized", function(a, b, c, d) {
            n = b;
            N = c;
            W = d;
            h()
        });
        a.d.i("stage:resized", function(a, b, c, d) {
            N = c;
            W = d
        });
        a.d.i("stage:disposed", function() {
            P.fb();
            E.fb();
            T.c()
        });
        a.d.i("expose:initialized", function(a) {
            r = a
        });
        a.d.i("zoom:initialized", function(a) {
            q = a
        });
        a.d.i("openclose:initialized", function(a) {
            s = a
        });
        a.d.i("select:initialized", function(a) {
            v = a
        });
        a.d.i("titlebar:initialized", function(a) {
            t = a
        });
        a.d.i("timeline:initialized", function(a) {
            p = a
        });
        var M;
        a.d.i("model:loaded", function(a, b) {
            x = a;
            M = b
        });
        a.d.i("model:childrenAttached",
            function(a) {
                M = a
            });
        this.u = function() {};
        this.za = c(d("mousedown", !1, function() {
            q.Kh()
        }));
        this.c = c(d("click", !0, function(a, b) {
            if (!b.Fb && !b.shiftKey) {
                var c = a.tc;
                c && (c.Ga ? document.location.href = xa.Gf("iuuq;..b`ssnurd`sbi/bnl.gn`lusdd") : v.select({
                    e: [c],
                    Aa: !c.selected,
                    xa: b.metaKey || b.ctrlKey
                }, !0))
            }
        }));
        this.k = c(d("doubleclick", !0, function(b, c) {
            var d, e;
            if (c.Fb || c.shiftKey) {
                if (d = b.tc) d.parent.Q && (d = d.parent), e = {
                    e: d.parent !== x ? [d.parent] : [],
                    Aa: !0,
                    xa: !1
                }, v.select(e, !0), s.jb({
                    e: [d],
                    Aa: !1,
                    xa: !0
                }, !0, !0), r.Qb(e, !0, !0, !1)
            } else if (d = b.tc) e = {
                e: [d],
                Aa: !0,
                xa: !1
            }, d.lc = !0, a.d.p("foamtree:attachChildren"), r.Qb(e, !0, !0, !1), p.B.m({}).Za(k.Qa / 2).call(function() {
                s.jb({
                    e: $.zc(x, function(a) {
                        return a.Ad && !$.zh(d, a)
                    }),
                    Aa: !1,
                    xa: !0
                }, !0, !0);
                d.Ad = !0;
                s.jb({
                    e: [d],
                    Aa: !0,
                    xa: !0
                }, !0, !0)
            }).start()
        }));
        this.va = c(d("hold", !0, function(a, b) {
            var c = !(b.metaKey || b.ctrlKey || b.shiftKey) && !b.Fb,
                d;
            (d = c ? a.tc : a.pg) && d !== x && !d.empty() && s.jb({
                    e: [d],
                    Aa: c,
                    xa: !0
                }, !0, !1)
        }));
        this.na = c(d("dragstart", !1, function(a, b) {
            y = b.x;
            A = b.y;
            B = Date.now()
        }));
        this.o = c(d("drag", !1, function(a, b) {
            var c = Date.now();
            K = Math.min(1, c - B);
            B = c;
            var c = b.x - y,
                d = b.y - A;
            q.Ih(c, d);
            z = c;
            C = d;
            y = b.x;
            A = b.y
        }));
        this.J = c(d("dragend", !1, function() {
            var a = Math.sqrt(z * z + C * C) / K;
            4 <= a ? q.Jh(a, z, C) : q.Se()
        }));
        this.Ya = c(d("transformstart", !1, function(a, b) {
            O = 1;
            y = b.x;
            A = b.y
        }));
        var u = 1,
            D = !1;
        this.Da = c(d("transform", !1, function(a, b) {
            var c = b.scale - 0.01;
            q.mg(b, c / O, b.x - y, b.y - A);
            O = c;
            y = b.x;
            A = b.y;
            u = O;
            D = D || 2 < b.touches
        }));
        this.Va = c(d("transformend", !1, function() {
            D && 0.8 > u ? a.d.p("interaction:reset") : e();
            D = !1
        }));
        this.Ka = c(d("mousewheel", !1, function() {
            var a = G.ug(function() {
                e()
            }, 300);
            return function(b, c) {
                var d = k.Vi;
                1 !== d && (d = Math.pow(d, c.fd), f ? (q.ng(c, d), a()) : q.Kb(c, d, k.mc, Z.ha(k.nc)).K(e))
            }
        }()));
        this.wa = c(function() {
            var b = void 0,
                c = {}, e = !1,
                f, k = d("hover", !1, function() {
                    b && (b.vb = !1, b.H = !0);
                    f && (f.vb = !0, f.H = !0);
                    t.update(f);
                    a.d.p("foamtree:dirty", !1)
                });
            return function(a) {
                if ("out" === a.type) f = void 0, e = !0;
                else if (q.absolute(a, c), b && !b.open && H(b, c)) {
                    var d = g(c, b.scale);
                    if (!d) return;
                    e = !0;
                    f = d
                } else e = !0, f = g(c, 0);
                e && (k(a), b = f, e = !1)
            }
        }());
        this.$a = {
           // click: l(this.c),
            click: console.log('click'),
            doubleclick: l(this.k),
            hold: l(this.va),
            mousedown: l(this.za),
            dragstart: l(this.na),
            drag: l(this.o),
            dragend: l(this.J),
            transformstart: l(this.Ya),
            transform: l(this.Da),
            transformend: l(this.Va),
            hover: l(this.wa),
            mousewheel: l(this.Ka)
        };
        var E = function() {
            function a(b, c) {
                return function(a) {
                    a = a.gesture;
                    var d = a.center,
                        d = ra.ie(n, d.pageX, d.pageY, {});
                    d.scale = a.scale;
                    d.Fb = 1 < a.touches.length;
                    d.touches = a.touches.length;
                    b.call(n, d);
                    (void 0 === d.Cb && c || "prevent" === d.Cb) && a.preventDefault()
                }
            }
            var b, c = {};
            return {
                u: function(a) {
                    b =
                        window.Hammer(a, {
                            doubletap_interval: 350,
                            hold_timeout: 400,
                            doubletap_distance: 10
                        })
                },
                m: function(d, e, f) {
                    c[d] = e;
                    b.on(d, a(e, f))
                },
                fb: function() {
                    b && G.Ca(c, function(a, c) {
                        b.off(c, a)
                    })
                }
            }
        }(),
            H = function() {
                var a = {};
                return function(b, c) {
                    b.ic(c, a);
                    return b.n && U.Ya(b.n, a)
                }
            }()
    };

    function Na(a) {
        function l(a, c, e, f) {
            var b, k = 0,
                h = [];
            for (b = 0; b < c.length; b++) {
                var l = Math.sqrt(U.c(c[b], c[(b + 1) % c.length]));
                h.push(l);
                k += l
            }
            for (b = 0; b < h.length; b++) h[b] /= k;
            a[0].x = e.x;
            a[0].y = e.y;
            var p = l = k = 0;
            for (b = 1; b < a.length; b++) {
                for (var r = a[b], s = 0.95 * Math.pow(b / a.length, f), k = k + 0.3819; l < k;) l += h[p], p = (p + 1) % h.length;
                var v = (p - 1 + h.length) % h.length,
                    t = 1 - (l - k) / h[v],
                    x = c[v].x,
                    v = c[v].y,
                    y = c[p].x,
                    A = c[p].y,
                    x = (x - e.x) * s + e.x,
                    v = (v - e.y) * s + e.y,
                    y = (y - e.x) * s + e.x,
                    A = (A - e.y) * s + e.y;
                r.x = x * (1 - t) + y * t;
                r.y = v * (1 - t) + A * t
            }
        }

        function h(a, c) {
            return c.V >
                a.V ? 1 : c.V < a.V ? -1 : c.group.label > a.group.label
        }
        var e = {
            random: {
                Ra: function(a, c) {
                    for (var e = 0; e < a.length; e++) {
                        var f = a[e];
                        f.x = c.x + Math.random() * c.f;
                        f.y = c.y + Math.random() * c.j
                    }
                },
                Lb: "box"
            },
            order: {
                Ra: function(a, c, e) {
                    l(a, c, e, 0.5)
                },
                Lb: "polygon"
            },
            treemap: {
                Ra: function(a, c) {
                    Da.hg(a, c)
                },
                Lb: "box"
            },
            fisheye: {
                Ra: function(a, c, e) {
                    a = a.slice(0);
                    a.sort(h);
                    l(a, c, e, 0.25)
                },
                Lb: "polygon"
            },
            blackhole: {
                Ra: function(a, c, e) {
                    a = a.slice(0);
                    a.sort(h).reverse();
                    l(a, c, e, 1)
                },
                Lb: "polygon"
            }
        }, c = a.options;
        this.u = function() {};
        this.c = function(a) {
            var g =
                a.e,
                h = a.O;
            if (0 < g.length) {
                var f = e[a.group.initializer || c.Ra || "random"];
                "box" === f.Lb ? (a = U.A(a.O, {}), f.Ra(g, a), U.Yd(g, U.oc(a), h)) : f.Ra(g, h, U.k(h, {}))
            }
        }
    };

    function Oa(a) {
        function l(a) {
            if (a.e) {
                a = a.e;
                for (var c = 0; c < a.length; c++) {
                    var d = a[c];
                    d.kc = d.fc * b.eh
                }
            }
        }

        function h(a, c) {
            for (var d = Math.pow(b.Tb, a.ya), e = b.Bc * d, d = b.ue * d, f = a.e, g = f.length - 1; 0 <= g; g--) {
                var k = f[g];
                if (k.T) {
                    var h = k,
                        l = d,
                        m = h.O;
                    m && (h.Ed = m);
                    h.O = Aa.Va(h.n, l);
                    m && !h.O && (h.ra = !0);
                    h.O && h.Ed && U.Yd(h.e, h.Ed, h.O)
                }
                h = k;
                h.pa = 0 < e && h.n ? Aa.Va(h.n, e) : h.n;
                h.pa && (U.A(h.pa, h.A), U.k(h.pa, h.da), h.Ab = Math.sqrt(h.da.fa / Math.PI));
                k.e && c.push(k)
            }
        }

        function e(a, c) {
            a !== f && 2 * Math.sqrt(a.da.fa / (Math.PI * a.e.length)) < Math.max(b.ve,
                n) || (a.O || (a.O = Aa.Va(a.n, b.ue * Math.pow(b.Tb, a.ya - 1))), a.O && (m.o(a), k.c(a), a.T = !0, c(a)), l(a))
        }

        function c(a) {
            a !== f && 2 * Math.sqrt(a.da.fa / (Math.PI * a.e.length)) < Math.max(0.85 * b.ve, n) && (a.T = !1, a.Ea = !1, a.Ma = !0, a.O = null)
        }

        function d(a) {
            var b = a.e;
            Ba.o(b, a.O);
            Ba.qc(b, a.O);
            return Ca.Yf(a) * (Math.sqrt(f.da.fa) / Math.sqrt(a.da.fa))
        }

        function g(a) {
            return a < b.xf || 1E-4 > a
        }
        var m = this,
            f, b = a.options,
            k = new Na(a),
            n = 5E-5,
            q = 0;
        a.d.i("model:loaded", function(a) {
            f = a;
            q = 0
        });
        this.u = function() {
            k.u()
        };
        this.k = function(a, k, l, m) {
            function n(b) {
                b.T &&
                    b.Ea ? c(b) : b.Ma && b.n && e(b, function() {
                        Ba.o(b.e, b.O);
                        Ba.qc(b.e, b.O);
                        a(b)
                    });
                if (!b.O || !b.T) return 0;
                var f;
                b.parent && b.parent.ra || b.Oa ? (f = d(b), m && m(b), b.Oa = !g(f), b.ra = !0) : f = 0;
                h(b, A);
                return f
            }

            function x(a, c, d) {
                q < a && (q = a);
                var e = b.xf;
                b.qf(c ? 1 : 1 - (a - e) / (q - e || 1), c, d);
                c && (q = 0)
            }
            for (var y = 0, A = [f]; 0 < A.length;) y = Math.max(y, n(A.shift()));
            var B = g(y);
            k && x(y, B, l);
            return B
        };
        this.c = function(a) {
            for (var b = [f]; 0 < b.length;) {
                var c = b.shift();
                !c.T && c.Ma && c.n && e(c, a);
                if (c.O) {
                    if (c.parent && c.parent.ra || c.Oa) {
                        for (var k = 1E-4 > c.da.fa,
                                l = 0; !(g(d(c)) || k && 32 < l++););
                        c.ra = !0;
                        c.Oa = !1
                    }
                    h(c, b)
                }
            }
        };
        this.J = function(a) {
            $.C(a, l)
        };
        this.o = function(a) {
            var b = a.e,
                c;
            c = 0;
            for (var d = a.e, e = 0; e < d.length; e++) c += d[e].V;
            a.jj = c;
            for (d = 0; d < b.length; d++) e = b[d], e.Mf = e.f, e.fc = a.fa / Math.PI * (0 < c ? e.V / c : 1 / b.length)
        }
    };
    var Pa = new function() {
            this.ag = function(a) {
                a.beginPath();
                a.moveTo(3.2, 497);
                a.bezierCurveTo(0.1, 495.1, 0, 494.1, 0, 449.6);
                a.bezierCurveTo(0, 403.5, -0.1, 404.8, 4.1, 402.6);
                a.bezierCurveTo(5.2, 402, 7.4, 401.4, 9, 401.2);
                a.bezierCurveTo(10.6, 401, 31.2, 400.6, 54.7, 400.2);
                a.bezierCurveTo(99.5, 399.4, 101, 399.5, 104.6, 402.3);
                a.bezierCurveTo(107.9, 404.9, 107.6, 404, 129.3, 473.2);
                a.bezierCurveTo(131, 478.6, 132.9, 484.4, 133.4, 486.1);
                a.bezierCurveTo(135.2, 491.4, 135.4, 494.9, 134, 496.4);
                a.bezierCurveTo(132.8, 497.7, 131.7, 497.7, 68.6,
                    497.7);
                a.bezierCurveTo(24.2, 497.7, 4, 497.5, 3.2, 497);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(162.1, 497);
                a.bezierCurveTo(159.5, 496.3, 157.7, 494.6, 156.2, 491.6);
                a.bezierCurveTo(155.5, 490.3, 148.7, 469.4, 141.1, 445.2);
                a.bezierCurveTo(126.1, 397.5, 125.6, 395.4, 128.1, 389.8);
                a.bezierCurveTo(129.5, 386.7, 164.1, 339, 168, 334.9);
                a.bezierCurveTo(170.3, 332.5, 172.2, 332.1, 175.1, 333.7);
                a.bezierCurveTo(176.1, 334.2, 189.3, 347, 204.3, 362.1);
                a.bezierCurveTo(229.4, 387.4, 231.8, 390, 233.5, 394);
                a.bezierCurveTo(235.2,
                    397.8, 235.4, 399.2, 235.4, 404.3);
                a.bezierCurveTo(235.3, 415, 230.5, 489.9, 229.8, 492.5);
                a.bezierCurveTo(228.4, 497.5, 229.2, 497.4, 194.7, 497.5);
                a.bezierCurveTo(177.8, 497.6, 163.1, 497.4, 162.1, 497);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(258.7, 497);
                a.bezierCurveTo(255.8, 496.1, 252.6, 492.3, 252, 489.1);
                a.bezierCurveTo(251.4, 484.8, 256.8, 405.2, 258.1, 401.1);
                a.bezierCurveTo(260.4, 393.4, 262.7, 391.1, 300.4, 359.2);
                a.bezierCurveTo(319.9, 342.6, 337.7, 327.9, 339.9, 326.5);
                a.bezierCurveTo(347.4,
                    321.6, 350.4, 321, 372, 320.5);
                a.bezierCurveTo(393.4, 320, 400.5, 320.4, 407.5, 322.5);
                a.bezierCurveTo(413.9, 324.4, 487.4, 359.5, 490.6, 362.1);
                a.bezierCurveTo(492, 363.3, 493.9, 365.8, 495, 367.7);
                a.lineTo(496.8, 371.2);
                a.lineTo(497, 419.3);
                a.bezierCurveTo(497.1, 445.7, 497, 468, 496.8, 468.8);
                a.bezierCurveTo(496.2, 471.6, 489.6, 480.8, 485, 485.3);
                a.bezierCurveTo(478.6, 491.7, 474.9, 494.1, 468.2, 496);
                a.lineTo(462.3, 497.7);
                a.lineTo(361.6, 497.7);
                a.bezierCurveTo(303.1, 497.6, 259.9, 497.3, 258.7, 497);
                a.closePath();
                a.fillStyle = "rgba(200,200,200,1)";
                a.fill();
                a.beginPath();
                a.moveTo(4.4, 380.8);
                a.bezierCurveTo(2.9, 380.2, 1.7, 379.8, 1.6, 379.8);
                a.bezierCurveTo(1.5, 379.8, 1.2, 378.8, 0.7, 377.6);
                a.bezierCurveTo(0.2, 376.1, 0, 361.6, 0, 331.2);
                a.bezierCurveTo(0, 281.2, -0.2, 283.1, 4.9, 280.9);
                a.bezierCurveTo(7.1, 279.9, 19.3, 278.2, 54.8, 274.1);
                a.bezierCurveTo(80.6, 271.1, 102.9, 268.6, 104.4, 268.6);
                a.bezierCurveTo(105.8, 268.6, 109.1, 269.4, 111.7, 270.4);
                a.bezierCurveTo(116, 272.1, 117.2, 273.2, 133.4, 289.3);
                a.bezierCurveTo(150.9, 306.8, 153.4, 310, 153.4, 314.5);
                a.bezierCurveTo(153.4,
                    317.6, 151.1, 321.3, 136.4, 341.2);
                a.bezierCurveTo(109.4, 377.8, 111.6, 375.3, 105.4, 378.1);
                a.lineTo(101.3, 380);
                a.lineTo(75.7, 380.5);
                a.bezierCurveTo(6.8, 381.8, 7.3, 381.8, 4.4, 380.8);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(243.5, 372.4);
                a.bezierCurveTo(240.2, 370.8, 136.6, 266.7, 134.2, 262.6);
                a.bezierCurveTo(132.1, 259, 131.7, 254.9, 133.2, 251.3);
                a.bezierCurveTo(134.5, 248.2, 166.3, 206, 169.3, 203.4);
                a.bezierCurveTo(172.6, 200.5, 178.5, 198.4, 183.2, 198.4);
                a.bezierCurveTo(187.1, 198.4, 275.2,
                    204.1, 281.6, 204.8);
                a.bezierCurveTo(289.7, 205.7, 294.6, 208.7, 297.6, 214.6);
                a.bezierCurveTo(300.5, 220.3, 327.4, 297.4, 327.8, 301.1);
                a.bezierCurveTo(328.3, 305.7, 326.7, 310.4, 323.4, 314);
                a.bezierCurveTo(322, 315.6, 307.8, 327.9, 291.9, 341.3);
                a.bezierCurveTo(256.2, 371.4, 256.6, 371.2, 253.9, 372.5);
                a.bezierCurveTo(251.1, 373.9, 246.5, 373.9, 243.5, 372.4);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(489.3, 339.1);
                a.bezierCurveTo(488.6, 338.9, 473.7, 331.9, 456.3, 323.6);
                a.bezierCurveTo(435.9, 313.9,
                    423.8, 307.8, 422.4, 306.4);
                a.bezierCurveTo(419.5, 303.7, 418, 300.2, 418, 296.1);
                a.bezierCurveTo(418, 292.5, 438, 185, 439.3, 181.6);
                a.bezierCurveTo(441.2, 176.6, 445.5, 173.1, 450.8, 172.1);
                a.bezierCurveTo(456, 171.2, 487.1, 169.2, 489.6, 169.7);
                a.bezierCurveTo(493.1, 170.3, 495.5, 171.9, 497, 174.7);
                a.bezierCurveTo(498.1, 176.7, 498.2, 181.7, 498.4, 253.2);
                a.bezierCurveTo(498.5, 295.3, 498.4, 330.9, 498.2, 332.5);
                a.bezierCurveTo(497.5, 337.4, 493.7, 340.2, 489.3, 339.1);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(353.2, 300.7);
                a.bezierCurveTo(350.4, 299.8, 347.9, 297.9, 346.5, 295.6);
                a.bezierCurveTo(345.8, 294.5, 338.2, 273.7, 329.6, 249.5);
                a.bezierCurveTo(314.6, 207.1, 314.1, 205.3, 314.1, 200.4);
                a.bezierCurveTo(314.1, 196.7, 314.4, 194.6, 315.3, 193);
                a.bezierCurveTo(316, 191.7, 322.5, 181.6, 329.8, 170.6);
                a.bezierCurveTo(346.8, 144.8, 345.4, 145.8, 365.8, 144.4);
                a.bezierCurveTo(380.9, 143.4, 385.7, 143.7, 390.6, 146.3);
                a.bezierCurveTo(397.3, 149.8, 417.4, 164.4, 419.2, 167);
                a.bezierCurveTo(422.4, 171.8, 422.4, 171.8, 410.6, 234.4);
                a.bezierCurveTo(402.3,
                    278.6, 399.3, 293.2, 398.1, 295.3);
                a.bezierCurveTo(395.4, 300.1, 393.7, 300.5, 373, 300.9);
                a.bezierCurveTo(363.1, 301.1, 354.2, 301, 353.2, 300.7);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(6.2, 259.9);
                a.bezierCurveTo(4.9, 259.2, 3.2, 257.8, 2.4, 256.8);
                a.bezierCurveTo(1, 254.9, 1, 254.8, 0.8, 148.7);
                a.bezierCurveTo(0.7, 74, 0.9, 40.8, 1.4, 36.7);
                a.bezierCurveTo(2.3, 29.6, 4.7, 24.4, 9.8, 18.3);
                a.bezierCurveTo(14.1, 13.1, 20.9, 7.3, 25, 5.3);
                a.bezierCurveTo(26.5, 4.6, 31, 3.3, 34.9, 2.6);
                a.bezierCurveTo(41.3,
                    1.3, 44.2, 1.2, 68.5, 1.4);
                a.lineTo(95.1, 1.6);
                a.lineTo(99, 3.5);
                a.bezierCurveTo(101.2, 4.6, 103.9, 6.6, 105.2, 8.1);
                a.bezierCurveTo(107.7, 11, 153.1, 88.2, 155.8, 94);
                a.bezierCurveTo(159.1, 101.4, 159.6, 104.7, 159.5, 121.6);
                a.bezierCurveTo(159.5, 147.8, 158.4, 177.2, 157.3, 181);
                a.bezierCurveTo(156.8, 182.8, 155.6, 186.1, 154.6, 188.1);
                a.bezierCurveTo(152.6, 192.2, 119.5, 237.2, 115.1, 241.8);
                a.bezierCurveTo(112.1, 244.9, 106.3, 248.3, 102, 249.4);
                a.bezierCurveTo(99.2, 250.1, 13, 261.1, 10.1, 261.1);
                a.bezierCurveTo(9.2, 261.1, 7.5, 260.6, 6.2,
                    259.9);
                a.closePath();
                a.fillStyle = "rgba(200,200,200,1)";
                a.fill();
                a.beginPath();
                a.moveTo(234.1, 183.4);
                a.bezierCurveTo(180.2, 179.7, 182.3, 180, 179.5, 174.5);
                a.lineTo(178, 171.4);
                a.lineTo(178.7, 142.4);
                a.bezierCurveTo(179.4, 114.8, 179.5, 113.3, 180.9, 110.4);
                a.bezierCurveTo(183.5, 105, 182.7, 105.2, 237.9, 95.3);
                a.bezierCurveTo(285.1, 86.7, 287.9, 86.3, 291, 87.1);
                a.bezierCurveTo(292.8, 87.6, 295.3, 88.8, 296.7, 89.9);
                a.bezierCurveTo(299.1, 91.8, 321.9, 124.4, 325, 130.3);
                a.bezierCurveTo(326.9, 134, 327.2, 139.1, 325.7, 142.6);
                a.bezierCurveTo(324.5,
                    145.5, 302.5, 179.1, 300.2, 181.5);
                a.bezierCurveTo(297, 184.9, 293.5, 186.3, 287.4, 186.5);
                a.bezierCurveTo(284.4, 186.6, 260.4, 185.2, 234.1, 183.4);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(435.8, 153.4);
                a.bezierCurveTo(434.8, 153.1, 433, 152.3, 431.7, 151.6);
                a.bezierCurveTo(428.4, 150, 410.1, 137.1, 407, 134.4);
                a.bezierCurveTo(404.1, 131.8, 402.7, 128.3, 403.2, 125.1);
                a.bezierCurveTo(403.6, 122.9, 420.3, 81.3, 423, 75.9);
                a.bezierCurveTo(424.7, 72.6, 426.6, 70.4, 429.3, 68.9);
                a.bezierCurveTo(431.1, 67.9,
                    435, 67.7, 462.2, 67.6);
                a.lineTo(493.1, 67.3);
                a.lineTo(495.4, 69.6);
                a.bezierCurveTo(497, 71.3, 497.8, 72.8, 498.1, 75);
                a.bezierCurveTo(498.4, 76.6, 498.5, 92.9, 498.4, 111.1);
                a.bezierCurveTo(498.2, 141.2, 498.1, 144.3, 497, 146.3);
                a.bezierCurveTo(494.8, 150.3, 493.3, 150.6, 470.3, 152.4);
                a.bezierCurveTo(448.6, 154, 438.8, 154.3, 435.8, 153.4);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(346.6, 125.3);
                a.bezierCurveTo(345, 124.5, 342.6, 122.6, 341.4, 121);
                a.bezierCurveTo(337.1, 115.7, 313, 79.8, 311.6, 76.7);
                a.bezierCurveTo(309.4, 71.7, 309.3, 68, 311.2, 58.2);
                a.bezierCurveTo(319.2, 16.9, 321.3, 7.1, 322.4, 5.2);
                a.bezierCurveTo(323.1, 4, 324.7, 2.4, 326, 1.6);
                a.bezierCurveTo(328.3, 0.3, 329.4, 0.3, 353.9, 0.3);
                a.bezierCurveTo(379.2, 0.3, 379.5, 0.3, 382.4, 1.8);
                a.bezierCurveTo(384, 2.7, 386, 4.5, 386.9, 5.9);
                a.bezierCurveTo(388.6, 8.6, 405.1, 46.3, 407.2, 52.2);
                a.bezierCurveTo(408.7, 56.3, 408.8, 60.7, 407.7, 64.1);
                a.bezierCurveTo(407.3, 65.4, 402.2, 78.2, 396.3, 92.7);
                a.bezierCurveTo(382.6, 126.3, 384.1, 124.6, 366.6, 126);
                a.bezierCurveTo(353.4, 127.1,
                    350, 127, 346.6, 125.3);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(179.2, 85.6);
                a.bezierCurveTo(175.7, 84.6, 171.9, 82, 170, 79.2);
                a.bezierCurveTo(167.2, 75.2, 130.6, 12.4, 129.3, 9.3);
                a.bezierCurveTo(128.2, 6.7, 128.1, 5.9, 128.8, 4.2);
                a.bezierCurveTo(130.5, 0, 125.2, 0.3, 211.7, 0);
                a.bezierCurveTo(255.3, -0.1, 292.2, 0, 293.9, 0.3);
                a.bezierCurveTo(297.7, 0.8, 301.1, 4, 301.8, 7.6);
                a.bezierCurveTo(302.3, 10.5, 293.9, 55.2, 291.9, 59.6);
                a.bezierCurveTo(290.4, 63, 286.1, 66.9, 282.3, 68.3);
                a.bezierCurveTo(279.6,
                    69.3, 193.5, 85.1, 185.5, 86.1);
                a.bezierCurveTo(183.8, 86.3, 181, 86.1, 179.2, 85.6);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(431.9, 47.7);
                a.bezierCurveTo(428.7, 46.9, 426.4, 45.2, 424.6, 42.3);
                a.bezierCurveTo(421.8, 37.8, 409.2, 7.7, 409.2, 5.5);
                a.bezierCurveTo(409.2, 1.2, 408, 1.3, 451.6, 1.3);
                a.bezierCurveTo(495, 1.3, 494, 1.2, 496.1, 5.4);
                a.bezierCurveTo(497, 7.2, 497.2, 10.2, 497, 25.5);
                a.lineTo(496.8, 43.5);
                a.lineTo(494.9, 45.4);
                a.lineTo(493, 47.3);
                a.lineTo(474.8, 47.7);
                a.bezierCurveTo(450.1, 48.3,
                    434.5, 48.3, 431.9, 47.7);
                a.closePath();
                a.fillStyle = "rgba(200,200,200,1)";
                a.fill();
                a.beginPath();
                a.moveTo(1.3, 511.9);
                a.lineTo(1.3, 514.3);
                a.lineTo(3.7, 514.3);
                a.bezierCurveTo(7.2, 514.4, 9.5, 515.5, 10.6, 517.6);
                a.bezierCurveTo(11.7, 519.8, 12.1, 522.7, 12, 526.3);
                a.lineTo(12, 591);
                a.lineTo(22.8, 591);
                a.lineTo(22.8, 553.2);
                a.lineTo(49.9, 553.2);
                a.lineTo(49.9, 548.5);
                a.lineTo(22.8, 548.5);
                a.lineTo(22.8, 516.7);
                a.lineTo(41.9, 516.7);
                a.bezierCurveTo(46.7, 516.7, 50.4, 517.8, 52.9, 520);
                a.bezierCurveTo(55.5, 522.2, 56.8, 525.7, 56.8,
                    530.5);
                a.lineTo(59.2, 530.5);
                a.lineTo(59.2, 521.5);
                a.bezierCurveTo(59.3, 519, 58.7, 516.8, 57.3, 514.9);
                a.bezierCurveTo(55.9, 513, 53.1, 512, 49, 511.9);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(107.6, 562.8);
                a.bezierCurveTo(107.6, 569.9, 106.2, 575.7, 103.5, 580.3);
                a.bezierCurveTo(100.8, 584.8, 97.2, 587.2, 92.7, 587.4);
                a.bezierCurveTo(88.1, 587.2, 84.5, 584.8, 81.8, 580.3);
                a.bezierCurveTo(79.1, 575.7, 77.8, 569.9, 77.7, 562.8);
                a.bezierCurveTo(77.8, 555.8, 79.1, 550, 81.8, 545.4);
                a.bezierCurveTo(84.5,
                    540.8, 88.1, 538.4, 92.7, 538.3);
                a.bezierCurveTo(97.2, 538.4, 100.8, 540.8, 103.5, 545.4);
                a.bezierCurveTo(106.2, 550, 107.6, 555.8, 107.6, 562.8);
                a.moveTo(66.3, 562.8);
                a.bezierCurveTo(66.4, 571.1, 68.7, 578, 73.2, 583.5);
                a.bezierCurveTo(77.8, 589.1, 84.2, 591.9, 92.7, 592.1);
                a.bezierCurveTo(101.1, 591.9, 107.6, 589.1, 112.1, 583.5);
                a.bezierCurveTo(116.7, 578, 118.9, 571.1, 119, 562.8);
                a.bezierCurveTo(118.9, 554.5, 116.7, 547.6, 112.1, 542.1);
                a.bezierCurveTo(107.6, 536.6, 101.1, 533.7, 92.7, 533.5);
                a.bezierCurveTo(84.2, 533.7, 77.8, 536.6, 73.2,
                    542.1);
                a.bezierCurveTo(68.7, 547.6, 66.4, 554.5, 66.3, 562.8);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(161.5, 579.6);
                a.bezierCurveTo(160.3, 581.4, 158.9, 583.1, 157.2, 584.5);
                a.bezierCurveTo(155.4, 585.9, 153.1, 586.7, 150.1, 586.8);
                a.bezierCurveTo(147, 586.8, 144.4, 585.9, 142.2, 584);
                a.bezierCurveTo(140, 582.1, 138.9, 579.3, 138.8, 575.4);
                a.bezierCurveTo(138.8, 571.7, 140.5, 568.9, 143.8, 566.7);
                a.bezierCurveTo(147.2, 564.6, 151.9, 563.5, 157.9, 563.4);
                a.lineTo(161.5, 563.4);
                a.moveTo(172.3, 591);
                a.lineTo(172.3, 558.6);
                a.bezierCurveTo(172.1, 548.2, 169.9, 541.3, 165.8, 538);
                a.bezierCurveTo(161.7, 534.7, 156.9, 533.2, 151.3, 533.5);
                a.bezierCurveTo(147.6, 533.5, 144.1, 533.8, 140.8, 534.5);
                a.bezierCurveTo(137.4, 535.1, 135, 536.2, 133.4, 537.7);
                a.bezierCurveTo(131.9, 539.2, 131.1, 540.8, 130.7, 542.6);
                a.bezierCurveTo(130.4, 544.4, 130.3, 546.4, 130.4, 548.5);
                a.lineTo(135.8, 548.5);
                a.bezierCurveTo(136.7, 544.6, 138.3, 542, 140.5, 540.5);
                a.bezierCurveTo(142.8, 538.9, 145.6, 538.2, 148.9, 538.3);
                a.bezierCurveTo(152.6, 538.1, 155.6, 539.4,
                    157.9, 542.2);
                a.bezierCurveTo(160.2, 545, 161.4, 550.5, 161.5, 558.6);
                a.lineTo(157.9, 558.6);
                a.bezierCurveTo(149.6, 558.5, 142.5, 559.7, 136.6, 562.1);
                a.bezierCurveTo(130.7, 564.5, 127.6, 568.9, 127.4, 575.4);
                a.bezierCurveTo(127.7, 581.8, 129.8, 586.3, 133.6, 588.7);
                a.bezierCurveTo(137.4, 591.1, 141.1, 592.3, 144.7, 592.1);
                a.bezierCurveTo(149.2, 592.1, 152.8, 591.3, 155.6, 590);
                a.bezierCurveTo(158.3, 588.6, 160.3, 587.1, 161.5, 585.6);
                a.lineTo(162.1, 585.6);
                a.lineTo(166.3, 591);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(200.3, 539.5);
                a.bezierCurveTo(199.8, 538, 198.7, 536.8, 197, 536);
                a.bezierCurveTo(195.4, 535.1, 193.1, 534.7, 190.2, 534.7);
                a.lineTo(179.4, 534.7);
                a.lineTo(179.4, 537.1);
                a.lineTo(181.8, 537.1);
                a.bezierCurveTo(185.3, 537.1, 187.6, 538.2, 188.7, 540.4);
                a.bezierCurveTo(189.8, 542.5, 190.3, 545.4, 190.2, 549.1);
                a.lineTo(190.2, 591);
                a.lineTo(200.9, 591);
                a.lineTo(200.9, 545.2);
                a.bezierCurveTo(202.4, 543.5, 204.2, 542, 206.2, 540.8);
                a.bezierCurveTo(208.3, 539.6, 210.5, 538.9, 212.9, 538.9);
                a.bezierCurveTo(215.9, 538.8, 218.3, 540, 219.9,
                    542.5);
                a.bezierCurveTo(221.6, 544.9, 222.4, 549.1, 222.5, 555);
                a.lineTo(222.5, 591);
                a.lineTo(233.2, 591);
                a.lineTo(233.2, 555);
                a.bezierCurveTo(233.3, 553.8, 233.2, 552.3, 233.2, 550.6);
                a.bezierCurveTo(233.1, 549, 232.9, 547.6, 232.6, 546.7);
                a.bezierCurveTo(233.9, 544.8, 235.7, 543, 238, 541.4);
                a.bezierCurveTo(240.4, 539.8, 242.7, 539, 245.2, 538.9);
                a.bezierCurveTo(248.2, 538.8, 250.6, 540, 252.3, 542.5);
                a.bezierCurveTo(253.9, 544.9, 254.8, 549.1, 254.8, 555);
                a.lineTo(254.8, 591);
                a.lineTo(265.6, 591);
                a.lineTo(265.6, 555);
                a.bezierCurveTo(265.4,
                    546.5, 263.8, 540.8, 260.6, 537.8);
                a.bezierCurveTo(257.4, 534.7, 253.4, 533.3, 248.8, 533.5);
                a.bezierCurveTo(245.4, 533.5, 242.2, 534.2, 238.9, 535.7);
                a.bezierCurveTo(235.7, 537.1, 233, 539.2, 230.9, 541.9);
                a.bezierCurveTo(229.3, 538.6, 227.3, 536.4, 224.8, 535.2);
                a.bezierCurveTo(222.3, 534, 219.5, 533.4, 216.5, 533.5);
                a.bezierCurveTo(212.9, 533.6, 209.8, 534.2, 207.1, 535.4);
                a.bezierCurveTo(204.5, 536.5, 202.4, 537.9, 200.9, 539.5);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(284, 511.9);
                a.bezierCurveTo(279.9,
                    512, 277.2, 513, 275.8, 514.9);
                a.bezierCurveTo(274.4, 516.8, 273.7, 519, 273.8, 521.5);
                a.lineTo(273.8, 530.5);
                a.lineTo(276.2, 530.5);
                a.bezierCurveTo(276.3, 525.7, 277.6, 522.2, 280.1, 520);
                a.bezierCurveTo(282.7, 517.8, 286.4, 516.7, 291.2, 516.7);
                a.lineTo(302, 516.7);
                a.lineTo(302, 590.9);
                a.lineTo(312.7, 590.9);
                a.lineTo(312.7, 516.7);
                a.lineTo(339.7, 516.7);
                a.lineTo(339.7, 511.9);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(349.4, 590.9);
                a.lineTo(360.2, 590.9);
                a.lineTo(360.2, 546.7);
                a.bezierCurveTo(361.4,
                    544.8, 363, 543.4, 364.9, 542.3);
                a.bezierCurveTo(366.9, 541.2, 369.1, 540.7, 371.5, 540.7);
                a.bezierCurveTo(373.7, 540.7, 375.5, 541, 377.2, 541.6);
                a.bezierCurveTo(378.9, 542.2, 380.2, 543.1, 381.1, 544.3);
                a.lineTo(385.9, 540.7);
                a.bezierCurveTo(385.3, 539.5, 384.7, 538.4, 384, 537.5);
                a.bezierCurveTo(383.4, 536.6, 382.6, 535.9, 381.7, 535.3);
                a.bezierCurveTo(380.8, 534.7, 379.7, 534.2, 378.3, 533.9);
                a.bezierCurveTo(377, 533.6, 375.8, 533.5, 374.5, 533.5);
                a.bezierCurveTo(370.9, 533.6, 367.9, 534.3, 365.5, 535.7);
                a.bezierCurveTo(363.2, 537, 361.4,
                    538.5, 360.2, 540.1);
                a.lineTo(359.6, 540.1);
                a.bezierCurveTo(359, 538.3, 357.9, 536.9, 356.3, 536);
                a.bezierCurveTo(354.6, 535.1, 352.4, 534.7, 349.4, 534.7);
                a.lineTo(339.8, 534.7);
                a.lineTo(339.8, 537.1);
                a.lineTo(341, 537.1);
                a.bezierCurveTo(344.5, 537.1, 346.8, 538.2, 347.9, 540.4);
                a.bezierCurveTo(349, 542.5, 349.5, 545.4, 349.4, 549.1);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(440.3, 559.8);
                a.bezierCurveTo(440.3, 551.4, 438.3, 544.9, 434.4, 540.4);
                a.bezierCurveTo(430.4, 535.8, 424.4, 533.5, 416.3, 533.5);
                a.bezierCurveTo(408.8, 533.7, 403, 536.6, 399, 542.1);
                a.bezierCurveTo(395, 547.6, 393, 554.5, 393, 562.8);
                a.bezierCurveTo(393, 571.1, 395.1, 578, 399.3, 583.5);
                a.bezierCurveTo(403.5, 589.1, 409.7, 591.9, 418.1, 592.1);
                a.bezierCurveTo(422.6, 592.2, 426.7, 591.2, 430.2, 589.2);
                a.bezierCurveTo(433.8, 587.2, 437, 584, 439.7, 579.6);
                a.lineTo(437.3, 577.8);
                a.bezierCurveTo(435.2, 580.8, 432.9, 583.1, 430.2, 584.8);
                a.bezierCurveTo(427.6, 586.5, 424.4, 587.3, 420.5, 587.4);
                a.bezierCurveTo(415.4, 587.2, 411.4, 585.1, 408.6, 580.9);
                a.bezierCurveTo(405.8,
                    576.8, 404.4, 571.3, 404.4, 564.6);
                a.lineTo(440, 564.6);
                a.moveTo(404.4, 559.8);
                a.bezierCurveTo(404.4, 553.7, 405.6, 548.7, 407.9, 544.9);
                a.bezierCurveTo(410.3, 541, 413.3, 539, 416.9, 538.9);
                a.bezierCurveTo(421.1, 538.9, 424.3, 540.8, 426.4, 544.4);
                a.bezierCurveTo(428.4, 548.1, 429.5, 553.2, 429.5, 559.8);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill();
                a.beginPath();
                a.moveTo(497.1, 559.8);
                a.bezierCurveTo(497.1, 551.4, 495.1, 544.9, 491.2, 540.4);
                a.bezierCurveTo(487.2, 535.8, 481.2, 533.5, 473.1, 533.5);
                a.bezierCurveTo(465.6, 533.7,
                    459.9, 536.6, 455.9, 542.1);
                a.bezierCurveTo(451.9, 547.6, 449.8, 554.5, 449.8, 562.8);
                a.bezierCurveTo(449.8, 571.1, 451.9, 578, 456.1, 583.5);
                a.bezierCurveTo(460.3, 589.1, 466.6, 591.9, 474.9, 592.1);
                a.bezierCurveTo(479.4, 592.2, 483.5, 591.2, 487.1, 589.2);
                a.bezierCurveTo(490.6, 587.2, 493.8, 584, 496.5, 579.6);
                a.lineTo(494.1, 577.8);
                a.bezierCurveTo(492, 580.8, 489.7, 583.1, 487.1, 584.8);
                a.bezierCurveTo(484.4, 586.5, 481.2, 587.3, 477.3, 587.4);
                a.bezierCurveTo(472.2, 587.2, 468.2, 585.1, 465.4, 580.9);
                a.bezierCurveTo(462.6, 576.8, 461.2, 571.3,
                    461.2, 564.6);
                a.lineTo(496.8, 564.6);
                a.moveTo(461.2, 559.8);
                a.bezierCurveTo(461.2, 553.7, 462.4, 548.7, 464.8, 544.9);
                a.bezierCurveTo(467.1, 541, 470.1, 539, 473.7, 538.9);
                a.bezierCurveTo(477.9, 538.9, 481.1, 540.8, 483.2, 544.4);
                a.bezierCurveTo(485.3, 548.1, 486.3, 553.2, 486.3, 559.8);
                a.closePath();
                a.fillStyle = "rgba(220,20,3,1)";
                a.fill()
            }
        };
    Pa.pc = {
        width: 498,
        height: 592
    };

    function Qa(a, l) {
        function h(a, b, c, d) {
            null === a && c.clearRect(0, 0, C, K);
            var e, f = Array(S.length);
            for (e = S.length - 1; 0 <= e; e--) f[e] = S[e].ia(c, d);
            for (e = S.length - 1; 0 <= e; e--) f[e] && S[e].S(c, d);
            N.wc([c, z], function(d) {
                var e;
                if (null !== a) {
                    c.save();
                    c.globalCompositeOperation = "destination-out";
                    c.fillStyle = "rgba(255, 255, 255, 1)";
                    for (e = a.length - 1; 0 <= e; e--) {
                        var g = a[e].n;
                        g && (c.save(), c.beginPath(), a[e].Ib(c), ga.Sd(c, g), c.fill(), c.restore())
                    }
                    c.restore()
                }
                d = d.scale;
                if (0 !== b.length) {
                    var k;
                    e = {};
                    for (k = S.length - 1; 0 <= k; k--) S[k].kg(e);
                    for (g = Y.length - 1; 0 <= g; g--)
                        if (k = Y[g], e[k.id]) {
                            var h = k.Jd;
                            for (k = 0; k < b.length; k++) {
                                var l = b[k];
                                !l.parent || l.parent.Ea && l.parent.T ? h(l, d) : l.aa.clear()
                            }
                        }
                }
                for (e = S.length - 1; 0 <= e; e--) g = S[e], f[e] && g.Ld(b, c, d)
            });
            for (e = S.length - 1; 0 <= e; e--) f[e] && S[e].Ba(c);
            u.$c && (c.canvas.style.opacity = 0.99, setTimeout(function() {
                c.canvas.style.opacity = 1
            }, 1))
        }

        function e(a) {
            r === v ? a < 0.9 * n && (r = s, x = y, m()) : a >= n && (r = v, x = A, m())
        }

        function c() {
            function a(b, c) {
                b.sb = Math.floor(100 * b.scale) - c;
                0 < b.opacity && !b.open && c++;
                var d = b.e;
                if (d)
                    for (var e =
                        d.length - 1; 0 <= e; e--) b.U && a(d[e], c)
            }
            var b = null,
                c = null,
                f = null;
            N.wc([], function(g) {
                e(g.scale);
                var h = !1;
                $.C(D, function(a) {
                    a.U && (h = a.ud() || h, a.ac(), a.Sa = a.Sa || P.c(a))
                });
                h && (D.H = !0);
                var l = "onSurfaceDirty" === u.Gg;
                $.gd(D, function(a) {
                    a.parent && a.parent.ra && (a.aa.clear(), a.Sa = !0, l || (a.uc = !0, a.Nb.clear()));
                    l && (a.uc = !0, a.Nb.clear())
                });
                var m = g.scale * g.scale;
                $.gd(D, function(a) {
                    if (a.T) {
                        for (var b = a.e, c = 0; c < b.length; c++)
                            if (1 < b[c].da.fa * m) {
                                a.Y = !0;
                                return
                            }
                        a.Y = !1
                    }
                });
                k(g);
                f = [];
                $.yc(D, function(a) {
                    if (a.parent.Y && a.ca && a.U) {
                        f.push(a);
                        for (var b = a.parent; b !== D && (b.open || 0 === b.opacity);) b = b.parent;
                        b !== D && 0.1 > Math.abs(b.scale - a.scale) && (a.scale = Math.min(a.scale, b.scale))
                    }
                });
                a(D, 0);
                f.sort(function(a, b) {
                    return a.sb - b.sb
                });
                if (d()) b = f, c = null;
                else {
                    var p = {}, n = {};
                    $.C(D, function(a) {
                        if (!p[a.id] && a.U && (a.ra || a.H || a.Ic && a.Sa)) {
                            for (var b = a.parent; b && b !== D;) 0 < b.opacity && (a = b), b = b.parent;
                            n[a.id] = !0;
                            $.Ha(a, function(a) {
                                p[a.id] = !0
                            })
                        }
                    });
                    b = f.filter(function(a) {
                        return p[a.id]
                    });
                    c = b.filter(function(a) {
                        return n[a.id]
                    })
                }
            });
            (function() {
                var a = !1;
                u.wf && $.C(D,
                    function(b) {
                        if (b.U && 0 !== b.ma.a && 1 !== b.ma.a) return a = !0, !1
                    });
                a ? ($.xc(D, function(a) {
                    if (a.U && a.opacity !== a.Mc) {
                        var b = a.e;
                        if (b) {
                            for (var c = 0, d = b.length - 1; 0 <= d; d--) c = Math.max(c, b[d].Hc);
                            a.Hc = c + a.opacity * a.ma.a
                        } else a.Hc = a.opacity * a.ma.a
                    }
                }), $.C(D, function(a) {
                    if (a.U && a.opacity !== a.Mc) {
                        for (var b = a.Hc, c = a;
                            (c = c.parent) && c !== D;) b += c.opacity * c.ma.a * u.uf;
                        a.ad = 0 < b ? 1 - Math.pow(1 - a.ma.a, 1 / b) : 0;
                        a.Mc = a.opacity
                    }
                })) : $.C(D, function(a) {
                    a.U && (a.ad = 1, a.Mc = -1)
                })
            })();
            return {
                Sf: b,
                Rf: c,
                ca: f
            }
        }

        function d() {
            var a = D.ra || D.H;
            if (!a && !D.empty()) {
                var b = D.e[0].scale;
                $.C(D, function(c) {
                    if (c.U && c.ca && c.scale !== b) return a = !0, !1
                })
            }!a && 0 < u.qe && $.C(D, function(b) {
                if (b.U && 0 < b.ja) return a = !0, !1
            });
            a = (a = a || 0 === u.Bc) || u.Bc < u.ub / 2 + 0.5;
            if (!a) {
                var c = !1;
                $.C(D, function(a) {
                    if (a.U && a.selected) return c = !0, !1
                });
                c && (a = a || u.Bc < u.jd / 2 + 0.5 + u.xe * u.jh.a)
            }
            return a
        }

        function g() {
            if (u.q !== u.ob) return !0;
            var a = "polygonPlainFill polygonPlainStroke polygonGradientFill polygonGradientStroke labelPlainFill contentDecoration".split(" ");
            $.C(D, function(b) {
                if (b.U && b.Q) return a.push("polygonExposureShadow"), !1
            });
            for (var b = a.length - 1; 0 <= b; b--) {
                var c = a[b];
                if ( !! H[c] !== !! L[c]) return !0
            }
            return !1
        }

        function m() {
            function a(c, d, e, f, g) {
                function k(a, b, c, d, e) {
                    a[d] && (b -= c * q[d], a[d] = !1, e && (b += c * q[e], a[e] = !0));
                    return b
                }
                c = G.extend({}, c);
                switch (e) {
                    case "never":
                        c.labelPlainFill = !1;
                        break;
                    case "always":
                    case "auto":
                        c.labelPlainFill = !0
                }
                if (u.Dc) switch (f) {
                    case "never":
                        c.contentDecoration = !1;
                        break;
                    case "always":
                    case "auto":
                        c.contentDecoration = !0
                } else c.contentDecoration = !1;
                var h = 0;
                G.Ca(c, function(a, b) {
                    a && (h += d * q["contentDecoration" ===
                        b ? "labelPlainFill" : b])
                });
                c.polygonExposureShadow = b;
                h += 2 * q.polygonExposureShadow;
                if (h <= g || (h = k(c, h, 2, "polygonExposureShadow")) <= g || (h = k(c, h, d, "polygonGradientFill", "polygonPlainFill")) <= g || (h = k(c, h, d, "polygonGradientStroke")) <= g || (h = k(c, h, d, "polygonPlainStroke")) <= g || "auto" === f && (h = k(c, h, d, "contentDecoration")) <= g) return c;
                "auto" === e && (h = k(c, h, d, "labelPlainFill"));
                return c
            }
            var b = r === s,
                c = 0,
                d = 0;
            $.he(D, function(a) {
                var b = 1;
                $.C(a, function() {
                    b++
                });
                c += b;
                d = Math.max(d, b)
            });
            var e = {};
            switch (u.Pg) {
                case "plain":
                    e.polygonPlainFill = !0;
                    break;
                case "gradient":
                    e.polygonPlainFill = !b, e.polygonGradientFill = b
            }
            switch (u.sh) {
                case "plain":
                    e.polygonPlainStroke = !0;
                    break;
                case "gradient":
                    e.polygonPlainStroke = !b, e.polygonGradientStroke = b
            }
            H = a(e, c, u.Ti, u.Ri, u.Si);
            L = a(e, 2 * d, "always", "always", u.zg);
            I = a(e, c, "always", "always", u.yg)
        }

        function f(a) {
            return function(b, c) {
                return b === r ? !0 === H[a] : !0 === (c ? L : I)[a]
            }
        }

        function b(a, b) {
            return function(c, d) {
                return a(c, d) && b(c, d)
            }
        }

        function k(a) {
            D.ca = !0;
            $.gd(D, function(b) {
                if (b.U && b.Y && b.Ea && b.T && (D.H || b.ra || b.Td)) {
                    b.Td = !1;
                    var c = b.e,
                        d = {
                            x: 0,
                            y: 0,
                            f: 0,
                            j: 0
                        }, e = !! b.O;
                    if (1 < C / a.f) {
                        var f;
                        for (f = c.length - 1; 0 <= f; f--) c[f].ca = !1;
                        if (b.ca && e)
                            for (f = c.length - 1; 0 <= f; f--)
                                if (b = c[f], 1 !== b.scale && (b.ic(a, d), d.f = a.f / b.scale, d.j = a.j / b.scale), !1 === b.ca && b.n) {
                                    var e = b.n,
                                        g = e.length;
                                    if (U.Ya(b.n, 1 === b.scale ? a : d)) b.ca = !0;
                                    else
                                        for (var k = 0; k < g; k++)
                                            if (U.gg(e[k], e[(k + 1) % g], 1 === b.scale ? a : d)) {
                                                b.ca = !0;
                                                if (b = b.G[k]) c[b.index].ca = !0;
                                                break
                                            }
                                }
                    } else
                        for (f = 0; f < c.length; f++) c[f].ca = e
                }
            })
        }
        var n = w.Le() ? 50 : 1E4,
            q, p, r, s, v, t, x, y, A, B, z, C, K, O, P = new Ra(a),
            T = new Sa(a),
            N,
            W, M, u = a.options,
            D, E, H, I, L;
        a.d.i("stage:initialized", function(a, b, c, d) {
            O = a;
            C = c;
            K = d;
            p = O.dc("wireframe", u.ob, !1);
            s = p.getContext("2d");
            v = new fa(s);
            t = O.dc("hifi", u.q, !1);
            y = t.getContext("2d");
            A = new fa(y);
            r = s;
            x = y;
            s.q = u.ob;
            v.q = u.ob;
            y.q = u.q;
            A.q = u.q;
            B = O.dc("tmp", Math.max(u.q, u.ob), !0);
            z = B.getContext("2d");
            z.q = 1;
            [s, y, z].forEach(function(a) {
                a.scale(a.q, a.q)
            })
        });
        a.d.i("stage:resized", function(a, b, c, d) {
            C = c;
            K = d;
            [s, y, z].forEach(function(a) {
                a.scale(a.q, a.q)
            })
        });
        a.d.i("model:loaded", function(b) {
            function c(a) {
                var b =
                    0;
                if (!a.empty()) {
                    for (var d = a.e, e = d.length - 1; 0 <= e; e--) b = Math.max(b, c(d[e]));
                    b += 1
                }
                return a.Jf = b
            }
            D = b;
            E = !0;
            c(D);
            m();
            a.d.p("render:renderers:resolved", H, L, I)
        });
        var Q = "groupFillType groupStrokeType wireframeDrawMaxDuration wireframeLabelDrawing wireframeContentDecorationDrawing finalCompleteDrawMaxDuration finalIncrementalDrawMaxDuration".split(" "),
            R = ["groupLabelLightColor", "groupLabelDarkColor", "groupLabelColorThreshold", "groupUnexposureLabelColorThreshold"];
        a.d.i("options:changed", function(a) {
            function b(a,
                c, d, e) {
                O.ui(a, d);
                c.q = d;
                e && c.scale(d, d)
            }
            a.dataObject || (G.hb(a, Q) && m(), G.hb(a, R) && $.C(D, function(a) {
                a.hd = -1
            }));
            var c = G.N(a, "pixelRatio");
            a = G.N(a, "wireframePixelRatio");
            if (c || a) c && b(t, x, u.q, !0), a && b(p, r, u.ob, !0), b(B, z, Math.max(u.q, u.ob), !1)
        });
        a.d.i("zoom:initialized", function(a) {
            N = a
        });
        a.d.i("timeline:initialized", function(a) {
            W = a
        });
        a.d.i("api:initialized", function(a) {
            M = a
        });
        var Y = [{
            id: "offsetPolygon",
            Jd: function(a) {
                if ((0 < a.opacity && (!1 === a.open || !0 === a.selected) || !a.Y) && a.aa.Ia()) {
                    var b = a.aa;
                    b.clear();
                    if (a.pa) {
                        var c = a.pa,
                            d = u.Bg;
                        0 < d ? (d = Math.min(1, d * Math.pow(1 - u.Cg * d, a.Jf)), ga.Fi(b, c, C + K >> 7, d)) : ga.Sd(b, c)
                    }
                    a.Cd = !0
                }
            }
        }, {
            id: "label",
            Jd: function(a) {
                a.Sa && a.Ic && P.k(a)
            }
        }, {
            id: "custom",
            Jd: function(b, c) {
                if (b.pa && (0 < b.opacity && (!1 === b.open || !0 === b.selected) || !b.Y) && b.uc && a.options.Dc && !b.Ga) {
                    var d = {};
                    M.Yc(d, b);
                    M.Zc(d, b);
                    M.Xc(d, b, !0);
                    d.context = b.Nb;
                    d.shapeDirty = b.Cd;
                    d.viewportScale = c;
                    var e = {
                        groupLabelDrawn: !0,
                        groupPolygonDrawn: !0
                    };
                    a.options.Fg(a.Bd, d, e);
                    e.groupLabelDrawn || (b.Me = !1);
                    e.groupPolygonDrawn || (b.Dd = !1);
                    b.Cd = !1;
                    b.uc = !1
                }
            }
        }].reverse(),
            S = [new function(a) {
                var b = Array(a.length);
                this.Ld = function(c, d, e) {
                    if (0 !== c.length) {
                        var f, g, k = [],
                            h = c[0].sb;
                        for (f = 0; f < c.length; f++) g = c[f], g.sb !== h && (k.push(f), h = g.sb);
                        k.push(f);
                        for (var l = h = 0; l < k.length; l++) {
                            for (var m = k[l], p = a.length - 1; 0 <= p; p--)
                                if (b[p]) {
                                    var n = a[p];
                                    d.save();
                                    for (f = h; f < m; f++) g = c[f], d.save(), g.Ib(d), n.mb.call(n, g, d, e), d.restore();
                                    n.ab.call(n, d, e);
                                    d.restore()
                                }
                            h = m
                        }
                    }
                };
                this.ia = function(c, d) {
                    for (var e = !1, f = a.length - 1; 0 <= f; f--) b[f] = a[f].ia(c, d), e |= b[f];
                    return e
                };
                this.S = function(c, d) {
                    for (var e = a.length - 1; 0 <= e; e--)
                        if (b[e]) {
                            var f = a[e];
                            f.S.call(f, c, d)
                        }
                };
                this.Ba = function(c) {
                    for (var d = a.length - 1; 0 <= d; d--)
                        if (b[d]) {
                            var e = a[d];
                            e.Ba.call(e, c)
                        }
                };
                this.kg = function(c) {
                    for (var d = a.length - 1; 0 <= d; d--) {
                        var e = a[d];
                        if (b[d])
                            for (var f = e.Wa.length - 1; 0 <= f; f--) c[e.Wa[f]] = !0
                    }
                }
            }([{
                Wa: ["offsetPolygon"],
                ia: f("polygonExposureShadow"),
                S: function(a) {
                    z.save();
                    z.scale(a.q, a.q)
                },
                Ba: function() {
                    z.restore()
                },
                c: function() {},
                ab: function(a) {
                    this.If && (this.If = !1, a.save(), a.setTransform(1, 0, 0, 1, 0,
                        0), a.drawImage(B, 0, 0, a.canvas.width, a.canvas.height, 0, 0, a.canvas.width, a.canvas.height), a.restore(), z.save(), z.setTransform(1, 0, 0, 1, 0, 0), z.clearRect(0, 0, B.width, B.height), z.restore())
                },
                mb: function(a, b, c) {
                    if (!(a.open && a.Y || a.aa.Ia())) {
                        var d = u.qe * a.opacity * a.ja * (1 - a.Bb) * a.parent.Bb * (1.1 <= u.gb ? 1 : (u.gb - 1) / 0.1);
                        0 < d && (z.save(), z.beginPath(), a.Ib(z), a.aa.Na(z), z.shadowBlur = c * b.q * d, z.shadowColor = u.Hg, z.fillStyle = "rgba(0, 0, 0, 1)", z.globalCompositeOperation = "source-over", z.globalAlpha = a.opacity, z.fill(),
                            z.shadowBlur = 0, z.shadowColor = "transparent", z.globalCompositeOperation = "destination-out", z.fill(), z.restore(), this.If = !0)
                    }
                }
            }, {
                Wa: ["offsetPolygon"],
                ia: function() {
                    return !0
                },
                S: function() {
                    function a(b) {
                        var d = b.ma,
                            e = b.vb,
                            f = b.selected,
                            g = c(d.l * b.sa + (e ? u.Ug : 0) + (f ? u.gh : 0)),
                            k = c(d.s * b.ta + (e ? u.Vg : 0) + (f ? u.hh : 0));
                        b = b.pe;
                        b.h = (d.h + (e ? u.Tg : 0) + (f ? u.fh : 0)) % 360;
                        b.s = k;
                        b.l = g;
                        return b
                    }

                    function c(a) {
                        return 100 < a ? 100 : 0 > a ? 0 : a
                    }
                    var d = [{
                        type: "fill",
                        ia: f("polygonPlainFill"),
                        Sc: function(b, c) {
                            c.fillStyle = V.rc(a(b))
                        }
                    }, {
                        type: "fill",
                        ia: f("polygonGradientFill"),
                        Sc: function(b, d) {
                            var e = b.Ab,
                                f = a(b),
                                e = d.createRadialGradient(b.x, b.y, 0, b.x, b.y, e * u.Lg);
                            e.addColorStop(0, V.J((f.h + u.Ig) % 360, c(f.s + u.Kg), c(f.l + u.Jg)));
                            e.addColorStop(1, V.J((f.h + u.Mg) % 360, c(f.s + u.Og), c(f.l + u.Ng)));
                            b.aa.Na(d);
                            d.fillStyle = e
                        }
                    }, {
                        type: "stroke",
                        ia: b(f("polygonPlainStroke"), function() {
                            return 0 < u.ub
                        }),
                        Sc: function(a, b) {
                            var d = a.ma,
                                e = a.vb,
                                f = a.selected;
                            b.strokeStyle = V.J((d.h + u.Be + (e ? u.re : 0) + (f ? u.ye : 0)) % 360, c(d.s * a.ta + u.De + (e ? u.te : 0) + (f ? u.Ae : 0)), c(d.l * a.sa + u.Ce + (e ? u.se :
                                0) + (f ? u.ze : 0)));
                            b.lineWidth = u.ub * Math.pow(u.Tb, a.ya - 1)
                        }
                    }, {
                        type: "stroke",
                        ia: b(f("polygonGradientStroke"), function() {
                            return 0 < u.ub
                        }),
                        Sc: function(a, b) {
                            var d = a.Ab * u.oh,
                                e = a.ma,
                                f = Math.PI * u.kh / 180,
                                d = b.createLinearGradient(a.x + d * Math.cos(f), a.y + d * Math.sin(f), a.x + d * Math.cos(f + Math.PI), a.y + d * Math.sin(f + Math.PI)),
                                g = a.vb,
                                k = a.selected,
                                f = (e.h + u.Be + (g ? u.re : 0) + (k ? u.ye : 0)) % 360,
                                h = c(e.s * a.ta + u.De + (g ? u.te : 0) + (k ? u.Ae : 0)),
                                e = c(e.l * a.sa + u.Ce + (g ? u.se : 0) + (k ? u.ze : 0));
                            d.addColorStop(0, V.J((f + u.lh) % 360, c(h + u.nh), c(e + u.mh)));
                            d.addColorStop(1, V.J((f + u.ph) % 360, c(h + u.rh), c(e + u.qh)));
                            b.strokeStyle = d;
                            b.lineWidth = u.ub * Math.pow(u.Tb, a.ya - 1)
                        }
                    }],
                        e = Array(d.length);
                    return function(a, b) {
                        for (var c = d.length - 1; 0 <= c; c--) e[c] = d[c].ia(a, b);
                        this.Ji = d;
                        this.qg = e
                    }
                }(),
                Ba: function() {},
                c: function() {},
                ab: function() {},
                mb: function(a, b) {
                    if (a.Dd && !((0 === a.opacity || a.open) && a.Y || a.aa.Ia())) {
                        var c = this.Ji,
                            d = this.qg;
                        b.beginPath();
                        a.aa.Na(b);
                        for (var e = !1, f = !1, g = c.length - 1; 0 <= g; g--) {
                            var k = c[g];
                            if (d[g]) switch (k.Sc(a, b), k.type) {
                                case "fill":
                                    e = !0;
                                    break;
                                case "stroke":
                                    f = !0
                            }
                        }
                        c = (a.Y ? a.opacity : 1) * a.ma.a;
                        d = !a.empty();
                        g = u.wf ? a.ad : 1;
                        e && (e = d && a.Y && a.T && a.e[0].U ? 1 - a.e.reduce(function(a, b) {
                            return a + b.qa * b.Gd
                        }, 0) / a.e.length * (1 - u.uf) : 1, b.globalAlpha = c * e * g, Ta(b));
                        f && (b.globalAlpha = c * (d ? u.Lh : 1) * g, b.closePath(), Ua(b), b.stroke())
                    }
                }
            }, {
                Wa: ["offsetPolygon"],
                ia: function() {
                    return 0 < u.jd
                },
                S: function() {},
                Ba: function() {},
                c: function() {},
                ab: function() {},
                mb: function(a, b, c) {
                    if (a.Dd && a.selected && !a.aa.Ia()) {
                        b.globalAlpha = a.Fa;
                        b.beginPath();
                        var d = Math.pow(u.Tb, a.ya - 1);
                        b.lineWidth = u.jd * d;
                        b.strokeStyle =
                            u.ih;
                        var e = u.xe;
                        0 < e && (b.shadowBlur = e * d * c * b.q, b.shadowColor = u.we);
                        a.aa.Na(b);
                        b.closePath();
                        b.stroke()
                    }
                }
            }, {
                Wa: [],
                ia: function() {
                    return !0
                },
                S: function() {},
                Ba: function() {},
                c: function() {},
                ab: function() {},
                mb: function(a, b) {
                    function c(d) {
                        var e = Pa.pc.width,
                            f = Pa.pc.height,
                            g = U.Zd(a.pa, a.da, e / f),
                            g = Math.min(Math.min(0.9 * g, 0.5 * a.A.j) / f, 0.5 * a.A.f / e);
                        b.save();
                        b.translate(a.x, a.y);
                        b.globalAlpha = a.opacity * a.Z;
                        b.scale(g, g);
                        b.translate(-e / 2, -f / 2);
                        d(b);
                        b.restore()
                    }
                    a.Ga && !a.aa.Ia() && c(function(a) {
                        Pa.ag(a)
                    })
                }
            }, {
                Wa: [],
                ia: function(a,
                    b) {
                    return function(c, d) {
                        return a(c, d) || b(c, d)
                    }
                }(f("labelPlainFill"), b(f("contentDecoration"), function() {
                    return u.Dc
                })),
                S: function() {},
                Ba: function() {},
                c: function() {},
                ab: function() {},
                mb: function(a, b, c) {
                    (0 < a.opacity && 0 < a.Z && !a.open || !a.Y) && !a.aa.Ia() && (a.Gc = a.la && a.la.ka && a.la.fontSize * a.scale * c >= u.bh, "auto" === a.od ? (b = a.pe, c = b.h + b.s << 9 + b.l << 16, a.hd !== c && (a.Yb = V.Xf(b) > (0 > a.ja ? u.th : u.Wg) ? u.Xg : u.ah, a.hd = c)) : a.Yb = a.od)
                }
            }, {
                Wa: ["custom"],
                ia: b(f("contentDecoration"), function() {
                    return u.Dc
                }),
                S: function() {},
                Ba: function() {},
                c: function() {},
                ab: function() {},
                mb: function(a, b) {
                    !(0 < a.opacity && 0 < a.Z && !a.open || !a.Y) || a.Nb.Ia() || a.aa.Ia() || !a.Gc && void 0 !== a.la || (b.globalAlpha = a.Z * (a.Y ? a.opacity : 1) * (a.empty() ? 1 : u.vf), b.fillStyle = a.Yb, b.strokeStyle = a.Yb, a.Nb.Na(b))
                }
            }, {
                Wa: ["label"],
                ia: f("labelPlainFill"),
                S: function() {},
                Ba: function() {},
                c: function() {},
                ab: function() {},
                mb: function(a, b, c) {
                    if (a.Me && a.Ic && (0 < a.opacity && 0 < a.Z && !a.open || !a.Y) && !a.aa.Ia() && a.la)
                        if (b.fillStyle = a.Yb, b.globalAlpha = a.Z * (a.Y ? a.opacity : 1) * (a.empty() ?
                            1 : u.vf), a.Gc) Va(a, b, c);
                        else {
                            var d = a.Ab;
                            c = d / 15;
                            var e = 0.5 * d / 15,
                                d = d / 5;
                            b.fillRect(a.x - e, a.y - e, c, c);
                            b.fillRect(a.x - e - d, a.y - e, c, c);
                            b.fillRect(a.x - e + d, a.y - e, c, c)
                        }
                }
            }].reverse())];
        this.u = function() {
            q = ua.xh(function() {
                return ha.wg()
            }, "CarrotSearchFoamTree", 12096E5)(Wa());
            T.u()
        };
        this.clear = function() {
            r.clearRect(0, 0, C, K);
            x.clearRect(0, 0, C, K)
        };
        this.Ld = function() {
            function a() {
                window.clearTimeout(b);
                b = setTimeout(function() {
                    if (g()) {
                        var a = !d();
                        h(null, e.ca, x, a);
                        G.defer(function() {
                            ba.Gi()
                        })
                    }
                }, Math.max(u.Ui, 3 * l.Nf.rd,
                    3 * l.Nf.qd))
            }
            var b, e;
            return function(b) {
                Xa(T);
                e = c();
                var d = null !== e.Rf,
                    f = 0 < O.Zb("hifi"),
                    g = f && (d || !b);
                b = d || E || !b;
                E = !1;
                f && !g && ba.Hi();
                h(e.Rf, e.Sf, g ? x : r, b);
                $.Ha(D, function(a) {
                    a.ra = !1;
                    a.H = !1
                });
                g || a();
                u.pf(d)
            }
        }();
        this.c = function(a) {
            a = a || {};
            Xa(T);
            D.H = !0;
            var b = c(),
                d = G.F(a.pixelRatio, u.q),
                e = O.dc("export", d, !0),
                f = e.getContext("2d");
            r === v && (f = new fa(f));
            f.scale(d, d);
            if (d = G.N(a, "backgroundColor")) f.save(), f.fillStyle = a.backgroundColor, f.fillRect(0, 0, C, K), f.restore();
            h(d ? [] : null, b.Sf, f, !0);
            return e.toDataURL(G.F(a.format,
                "image/png"), G.F(a.quality, 0.8))
        };
        var ba = function() {
            function a(b, d, e, f) {
                function g(a, b, c, d) {
                    return W.B.m({
                        opacity: O.Zb(a)
                    }).ba({
                        duration: c,
                        D: {
                            opacity: {
                                end: b,
                                L: d
                            }
                        },
                        W: function() {
                            O.Zb(a, this.opacity)
                        }
                    }).ua()
                }
                var k = G.kd(O.Zb(b), 1),
                    h = G.kd(O.Zb(e), 0);
                if (!k || !h) {
                    for (var l = c.length - 1; 0 <= l; l--) c[l].stop();
                    c = [];
                    k || c.push(g(b, 1, d, Z.Gb));
                    h || c.push(g(e, 0, f, Z.Kf));
                    return W.B.m({}).Ua(c).start()
                }
            }
            var b, c = [];
            return {
                Hi: function() {
                    u.$c ? 1 !== p.style.opacity && (p.style.visibility = "visible", t.style.visibility = "hidden",
                        p.style.opacity = 1, t.style.opacity = 0) : b && b.wb() || (b = a("wireframe", u.me, "hifi", u.me))
                },
                Gi: function() {
                    u.$c ? (t.style.visibility = "visible", p.style.visibility = "hidden", p.style.opacity = 0, t.style.opacity = 1) : a("hifi", u.Uf, "wireframe", u.Uf)
                }
            }
        }();
        Xa = function(a) {
            a.apply()
        };
        Ta = function(a) {
            a.fill()
        };
        Ua = function(a) {
            a.stroke()
        };
        return this
    }
    var Ta, Ua, Xa;

    function Ra(a) {
        function l(a) {
            "undefined" !== typeof a.groupLabelFontFamily && (e.fontFamily = a.groupLabelFontFamily);
            "undefined" !== typeof a.groupLabelLineHeight && (e.lineHeight = a.groupLabelLineHeight);
            "undefined" !== typeof a.groupLabelHorizontalPadding && (e.Vb = a.groupLabelHorizontalPadding);
            "undefined" !== typeof a.groupLabelVerticalPadding && (e.Jb = a.groupLabelVerticalPadding);
            "undefined" !== typeof a.groupLabelMaxTotalHeight && (e.cc = a.groupLabelMaxTotalHeight);
            "undefined" !== typeof a.groupLabelMaxFontSize && (e.bc =
                a.groupLabelMaxFontSize)
        }
        var h = a.options,
            e = {}, c, d = {
                groupLabel: ""
            };
        a.d.i("api:initialized", function(a) {
            c = a
        });
        a.d.i("options:changed", l);
        l(a.Bd);
        this.c = function(a) {
            var e = a.group.label;
            h.Zg && !a.Ga && (d.labelText = e, c.dd(h.Yg, a, d), e = d.labelText);
            a.Ne = e;
            return a.pd != e
        };
        this.k = function(a) {
            var c = a.Ne;
            a.pd = c;
            a.nd.clear();
            a.la = void 0;
            if (!G.R(c) && a.pa) {
                var d = a.da;
                a.la = J.ae(e, a.nd, c, a.pa, a.A, d, !1, !1, a.Bh, d.fa, h.dh, a.Sa)
            }
            a.Sa = !1
        };
        Va = this.o = function(a, c) {
            a.nd.Na(c)
        }
    }
    var Va;

    function Sa(a) {
        function l(a, c) {
            var d = a.e,
                e = d.length,
                f, g, h = m.Ab;
            for (f = 0; f < e; f++) g = d[f], g.tb = (180 * (Math.atan2(g.x - a.x, g.y - a.y) + c) / Math.PI + 180) / 360, g.Cc = Math.min(1, Math.sqrt(U.c(g, a)) / h)
        }

        function h(a, c) {
            var d = a.e,
                e = d.length;
            if (1 === e) d[0].tb = 0.5;
            else {
                var f, g, h = 0,
                    l = Number.MAX_VALUE,
                    m = Math.sin(c),
                    x = Math.cos(c);
                for (f = 0; f < e; f++) {
                    g = d[f];
                    var y = g.x * m + g.y * x;
                    h < y && (h = y);
                    l > y && (l = y);
                    g.tb = y;
                    g.Cc = 1
                }
                for (f = 0; f < e; f++) g = d[f], g.tb = (g.tb - l) / (h - l)
            }
        }

        function e(a, c, d, e) {
            c = c[e];
            return c + (d[e] - c) * a
        }
        var c = {
            radial: l,
            linear: h
        },
            d = a.options,
            g, m, f = {
                groupColor: null,
                labelColor: null
            };
        a.d.i("model:loaded", function(a) {
            m = a
        });
        a.d.i("api:initialized", function(a) {
            g = a
        });
        this.u = function() {};
        this.apply = function() {
            function a(c) {
                if (c.T && c.Ea) {
                    var h = c.e,
                        l, m;
                    if (c.ra || c.cb || v) {
                        0 === c.ya ? n(c, d.ji * Math.PI / 180) : q(c, d.ni * Math.PI / 180);
                        for (l = h.length - 1; 0 <= l; l--) {
                            m = h[l];
                            m.cb = !0;
                            var C = m.tb,
                                K, O, P, T, N = m.oe;
                            0 === c.ya ? (K = e(C, p, r, "h"), O = (x + (1 - x) * m.Cc) * e(C, p, r, "s"), P = (1 + (0 > m.ja ? t * (m.ja + 1) : t) * (1 - m.Cc)) * e(C, p, r, "l"), T = e(C, p, r, "a")) : (P = c.ma, K = P.h, O = P.s, P = k(P.l,
                                C, d.oi, d.pi), T = c.oe.a);
                            N.h = K;
                            N.s = O;
                            N.l = P;
                            N.a = T;
                            K = m.ma;
                            m.Ga ? (K.h = 0, K.s = 0, K.l = 90, K.a = 1) : (K.h = N.h, K.s = N.s, K.l = N.l, K.a = N.a);
                            v && !m.Ga && (f.groupColor = K, f.labelColor = "auto", g.dd(s, m, f, function(a) {
                                a.ratio = C
                            }), m.ma = V.za(f.groupColor), m.ma.a = G.N(f.groupColor, "a") ? f.groupColor.a : 1, "auto" !== f.labelColor && (m.od = V.jg(f.labelColor)))
                        }
                        c.cb = !1
                    }
                    for (l = h.length - 1; 0 <= l; l--) a(h[l])
                }
            }

            function k(a, b, c, d) {
                var e = 0 > a + c * d ? 0 : 100 < a + c * d ? 100 : a + c * d;
                return e + b * ((0 > a - c * (1 - d) ? 0 : 100 < a - c * (1 - d) ? 100 : a - c * (1 - d)) - e)
            }
            var n = c[d.ii] || l,
                q = h,
                p =
                    d.si,
                r = d.li,
                s = d.Dg,
                v = d.Eg,
                t = d.mi,
                x = d.qi;
            a(m)
        };
        return this
    };

    function Ga() {
        this.kc = this.Wd = this.fc = this.Mf = this.f = this.Tf = this.V = this.y = this.x = this.id = 0;
        this.n = this.parent = this.e = null;
        this.A = {
            x: 0,
            y: 0,
            f: 0,
            j: 0
        };
        this.G = null;
        this.pd = this.Ne = void 0;
        this.Vc = !1;
        this.Cc = this.tb = 0;
        this.oe = {
            h: 0,
            s: 0,
            l: 0,
            a: 0,
            model: "hsla"
        };
        this.ma = {
            h: 0,
            s: 0,
            l: 0,
            a: 0,
            model: "hsla"
        };
        this.pe = {
            h: 0,
            s: 0,
            l: 0,
            model: "hsl"
        };
        this.hd = -1;
        this.od = "auto";
        this.Yb = "#000";
        this.Jf = this.ya = this.Wb = this.index = 0;
        this.Ga = !1;
        this.fa = this.Re = 0;
        this.ca = !1;
        this.pa = null;
        this.da = {
            x: 0,
            y: 0,
            fa: 0
        };
        this.Ab = 0;
        this.Ed = this.O =
            null;
        this.Ic = this.U = this.uc = this.Td = this.Cd = this.Sa = this.cb = this.H = this.ra = this.Oa = this.Ea = this.T = this.Ma = !1;
        this.ta = this.sa = this.Fa = this.Z = this.opacity = this.scale = 1;
        this.qa = 0;
        this.Gd = 1;
        this.Bb = this.ja = this.xb = 0;
        this.selected = this.vb = this.Ad = this.open = this.Q = !1;
        this.sb = 0;
        this.Me = this.Dd = this.Y = !0;
        this.la = void 0;
        this.Gc = !1;
        this.nd = new da;
        this.aa = new da;
        this.Nb = new da;
        this.Bh = J.Nh();
        this.Hc = 0;
        this.ad = 1;
        this.Mc = -1;
        this.empty = function() {
            return !this.e || 0 === this.e.length
        };
        var a = [];
        this.sc = function(c) {
            a.push(c)
        };
        this.Qc = function(c) {
            G.yf(a, c)
        };
        var l = {
            scale: 1
        };
        this.ud = function() {
            var c = !1;
            this.scale = 1;
            for (var d = 0; d < a.length; d++) c = a[d].Oe(this, l) || c, this.scale *= l.scale;
            return c
        };
        this.Ib = function(c) {
            for (var d = 0; d < a.length; d++) a[d].Ib(this, c)
        };
        this.hc = function(c, d) {
            d.x = c.x;
            d.y = c.y;
            for (var e = 0; e < a.length; e++) a[e].hc(this, d, d);
            return d
        };
        this.ic = function(c, d) {
            d.x = c.x;
            d.y = c.y;
            for (var e = 0; e < a.length; e++) a[e].ic(this, d, d);
            return d
        };
        var h = [];
        this.qb = function(a) {
            h.push(a)
        };
        this.Pc = function(a) {
            G.yf(h, a)
        };
        var e = {
            opacity: 1,
            ta: 1,
            sa: 1,
            Z: 1,
            Fa: 1
        };
        this.ac = function() {
            if (0 !== h.length) {
                this.Fa = this.Z = this.sa = this.ta = this.opacity = 1;
                for (var a = h.length - 1; 0 <= a; a--)(0, h[a])(this, e), this.opacity *= e.opacity, this.sa *= e.sa, this.ta *= e.ta, this.Z *= e.Z, this.Fa *= e.Fa
            }
        }
    };

    function Za(a) {
        var l = this,
            h, e, c, d, g = a.options,
            m, f;
        a.d.i("stage:initialized", function(b, f, m, q) {
            c = m;
            d = q;
            h = b.dc("titlebar", g.q, !1);
            e = h.getContext("2d");
            e.q = g.q;
            e.scale(e.q, e.q);
            a.d.p("titlebar:initialized", l)
        });
        a.d.i("stage:resized", function(a, f, g, h) {
            c = g;
            d = h;
            e.scale(e.q, e.q)
        });
        a.d.i("zoom:initialized", function(a) {
            f = a
        });
        a.d.i("api:initialized", function(a) {
            m = a
        });
        a.d.i("model:loaded", function() {
            e.clearRect(0, 0, c, d)
        });
        this.update = function(a) {
            e.clearRect(0, 0, c, d);
            if (a) {
                var h = g.Oi,
                    l = g.Ni,
                    q = Math.min(d / 2, g.Ud +
                        2 * h),
                    p = q - 2 * h,
                    r = c - 2 * l;
                if (!(0 > p || 0 > r)) {
                    var s = a.Gc ? a.la.fontSize * a.scale * f.scale() : 0,
                        v, t = {
                            titleBarText: a.pd,
                            titleBarTextColor: g.Qf,
                            titleBarBackgroundColor: g.Pf,
                            titleBarMaxFontSize: g.Ud,
                            titleBarShown: s <= g.Gh
                        };
                    a.Ga ? v = xa.Gf("B`ssnu!Rd`sbi!Gn`lUsdd!whrt`mh{`uhno/!Bmhbj!uid!mnfn!un!fn!un!iuuq;..b`ssnurd`sbi/bnl.gn`lusdd!gns!lnsd!edu`hmr/") : (m.dd(g.Ki, a, t, function(a) {
                        a.titleBarWidth = r;
                        a.titleBarHeight = p;
                        a.labelFontSize = s;
                        a.viewportScale = f.scale()
                    }), v = t.titleBarText);
                    v && 0 !== v.length && t.titleBarShown && (a = f.Xd(a.hc(a, {}), {}).y > d / 2, h = {
                        x: l,
                        y: a ? h : d - q + h,
                        f: r,
                        j: p
                    }, l = U.oc(h), e.fillStyle = g.Pf, e.fillRect(0, a ? 0 : d - q, c, q), e.fillStyle = g.Qf, J.le({
                        fontFamily: g.Li || g.$g,
                        bc: g.Ud,
                        Jc: g.Mi,
                        Vb: 0,
                        Jb: 0,
                        cc: 1
                    }, e, v, l, h, {
                        x: h.x + h.f / 2,
                        y: h.y + h.j / 2
                    }, !0, !0))
                }
            }
        }
    };

    function $a(a) {
        function l(a, b, c) {
            t = !0;
            k && k.stop();
            q && q.stop();
            return g(f.reset(a), b, c).K(function() {
                t = !1
            })
        }

        function h(b) {
            f.update(b);
            s.H = !0;
            a.d.p("foamtree:dirty", !0)
        }

        function e(a, b) {
            return f.c((0 !== f.k() ? 0.35 : 1) * a, (0 !== f.o() ? 0.35 : 1) * b)
        }

        function c() {
            if (1 === b.Db) {
                var a = Math.round(1E4 * f.k()) / 1E4;
                0 !== a && (n.Hd = a, k = v.B.jc(n).ba({
                    duration: 500,
                    D: {
                        x: {
                            start: a,
                            end: 0,
                            L: Z.Gb
                        }
                    },
                    W: function() {
                        f.c(n.x - n.Hd, 0);
                        h(1);
                        n.Hd = n.x
                    }
                }).start())
            }
        }

        function d() {
            if (1 === b.Db) {
                var a = Math.round(1E4 * f.o()) / 1E4;
                0 !== a && (p.Id = a, q = v.B.jc(p).ba({
                    duration: 500,
                    D: {
                        y: {
                            start: a,
                            end: 0,
                            L: Z.Gb
                        }
                    },
                    W: function() {
                        f.c(0, p.y - p.Id);
                        h(1);
                        p.Id = p.y
                    }
                }).start())
            }
        }

        function g(a, c, d) {
            return a ? v.B.jc(b).ba({
                duration: void 0 === c ? 700 : c,
                D: {
                    Db: {
                        start: 0,
                        end: 1,
                        L: d || Z.Lf
                    }
                },
                W: function() {
                    h(b.Db)
                }
            }).Xa() : (new X).I().M()
        }

        function m(a) {
            return function() {
                return t ? (new X).I().M() : a.apply(this, arguments)
            }
        }
        var f = new oa(a),
            b = {
                Db: 1
            }, k, n = {
                ee: 0,
                x: 0,
                Hd: 0
            }, q, p = {
                fe: 0,
                y: 0,
                Id: 0
            }, r = this,
            s, v, t = !1;
        a.d.i("model:loaded", function(a) {
            s = a;
            f.reset(!1);
            f.update(1)
        });
        a.d.i("timeline:initialized", function(a) {
            v = a
        });
        this.u = function() {
            a.d.p("zoom:initialized", this)
        };
        this.reset = function(a, b) {
            f.Eb(1);
            return l(!0, a, b)
        };
        this.normalize = m(function(a, b) {
            f.vc(1) ? l(!1, a, b) : r.Se()
        });
        this.Se = function() {
            c();
            d()
        };
        this.c = m(function(a, b, c, d) {
            return r.gc(a.A, b, c, d)
        });
        this.Kb = m(function(a, b, c, d) {
            return g(f.Kb(a, b), c, d)
        });
        this.gc = m(function(a, b, c, d) {
            return g(f.gc(a, b), c, d)
        });
        this.Pi = m(function(a, b) {
            f.gc(a, b) && h(1)
        });
        this.Ih = m(function(a, c) {
            1 === b.Db && e(a, c) && h(1)
        });
        this.ng = m(function(a, b) {
            f.Kb(a, b) && h(1)
        });
        this.mg = m(function(a,
            b, c, d) {
            a = 0 | f.Kb(a, b);
            (a |= e(c, d)) && h(1)
        });
        this.Jh = m(function(a, g, l) {
            1 === b.Db && (k = v.B.jc(n).ba({
                duration: a / 0.03,
                D: {
                    ee: {
                        start: g,
                        end: 0,
                        L: Z.Gb
                    }
                },
                W: function() {
                    f.c(n.ee, 0) && h(1);
                    c()
                }
            }).start(), q = v.B.jc(p).ba({
                duration: a / 0.03,
                D: {
                    fe: {
                        start: l,
                        end: 0,
                        L: Z.Gb
                    }
                },
                W: function() {
                    e(0, p.fe) && h(1);
                    d()
                }
            }).start())
        });
        this.Kh = function() {
            k && 0 === f.k() && k.stop();
            q && 0 === f.o() && q.stop()
        };
        this.wc = function(a, b) {
            f.wc(a, b)
        };
        this.Eb = function(a) {
            return f.Eb(a)
        };
        this.vc = function(a) {
            return f.vc(a)
        };
        this.zd = function() {
            return f.zd()
        };
        this.absolute =
            function(a, b) {
                return f.absolute(a, b)
        };
        this.Xd = function(a, b) {
            return f.Xd(a, b)
        };
        this.scale = function() {
            return f.scale()
        };
        this.content = function(a, b, c, d) {
            f.content(a, b, c, d)
        }
    };

    function ab(a, l, h) {
        function e(a) {
            var b = [];
            $.C(n, function(c) {
                a(c) && b.push(c.group)
            });
            return {
                groups: b
            }
        }

        function c(a, b) {
            var c = k.options,
                d = c.yi,
                e = c.xi,
                c = c.Md,
                f = 0 < d + e ? c : 0,
                g = [];
            Ca.Da(a, Ca.na(a, k.options.Od), function(a, c, h) {
                c = "groups" === k.options.Nd ? h : c;
                a.e && (a = p.B.m(a).Za(f * (e + d * c)).call(b).ua(), g.push(a))
            });
            return p.B.m({}).Ua(g).Xa()
        }

        function d(a) {
            R || (R = !0, q.c(function() {
                R = !1;
                k.d.p("repaint:before");
                A.Ld(this.lg)
            }, {
                lg: a
            }))
        }

        function g() {
            function a(d, e) {
                var f = d.U;
                d.U = e <= b;
                d.Ic = e <= c;
                d.U != f && $.ge(d, function(a) {
                    a.Td = !0
                });
                d.open || d.lc || e++;
                if (f = d.e)
                    for (var g = 0; g < f.length; g++) a(f[g], e)
            }
            var b = k.options.vd,
                c = Math.min(k.options.vd, k.options.Eh);
            a(n, 1)
        }

        function m() {
            var a = [],
                b = f();
            b.Hh && k.d.p("model:childrenAttached", $.zc(n));
            b.ti && y.c(function(b) {
                L.ib(b);
                a.push(b)
            });
            for (b = 0; b < a.length; b++) {
                var c = a[b];
                c.Ea = !0;
                C.c(c)
            }
        }

        function f() {
            for (var a = k.options.vd, b = !1, c = !1, d = [n, 1]; 0 < d.length;) {
                var e = d.shift(),
                    f = d.shift(),
                    g = f <= a;
                e.parent && (c = c || g && !e.parent.Ma, e.parent.Ma = g);
                e.open || e.lc || f++;
                var h = e.e;
                !h && g && (b = x.J(e) || b, h = e.e);
                if (h)
                    for (e = 0; e < h.length; e++) d.push(h[e], f)
            }
            return {
                Hh: b,
                ti: c
            }
        }
        var b = this,
            k = {
                d: new wa,
                options: l,
                Bd: h
            }, n, q = new aa,
            p = new ya(q),
            r = F.create(),
            s = new ma(k),
            v = new $a(k),
            t = new Ea(k),
            x = new Fa(k.options),
            y = new Oa(k),
            A = new Qa(k, q),
            B = new Ma(k);
        new Za(k);
        var z = new Ia(k),
            C = new Ja(k),
            K = new Ka(k),
            O = new La(k);
        k.d.i("stage:initialized", function(a, b, c, d) {
            u.yh(c, d)
        });
        k.d.i("stage:resized", function(a, b, c, d) {
            u.wi(a, b, c, d)
        });
        k.d.i("foamtree:attachChildren", m);
        k.d.i("openclose:changing", g);
        k.d.i("interaction:reset", function() {
            Q(!0)
        });
        k.d.i("foamtree:dirty", d);
        this.u = function() {
            k.d.p("timeline:initialized", p);
            n = x.u();
            s.u(a);
            t.u();
            y.u();
            A.u();
            B.u();
            z.u();
            C.u();
            v.u();
            K.u();
            O.u()
        };
        this.fb = function() {
            p.c();
            I.stop();
            q.k();
            s.fb()
        };
        var P = "groupLabelFontFamily groupLabelLineHeight groupLabelHorizontalPadding groupLabelVerticalPadding groupLabelDottingThreshold groupLabelMaxTotalHeight groupLabelMinFontSize groupLabelMaxFontSize groupLabelDecorator".split(" "),
            T = "rainbowColorDistribution rainbowLightnessDistribution rainbowColorDistributionAngle rainbowLightnessDistributionAngle rainbowColorModelStartPoint rainbowLightnessCorrection rainbowSaturationCorrection rainbowStartColor rainbowEndColor rainbowHueShift rainbowHueShiftCenter rainbowSaturationShift rainbowSaturationShiftCenter rainbowLightnessShift rainbowLightnessShiftCenter".split(" "),
            N = !1,
            W = ["groupBorderRadius", "groupBorderRadiusCorrection", "groupBorderWidth", "groupInsetWidth", "groupBorderWidthScaling"],
            M = ["maxGroupLevelsDrawn", "maxGroupLabelLevelsDrawn"];
        this.$a = function(a) {
            k.d.p("options:changed", a);
            G.hb(a, P) && $.C(n, function(a) {
                a.Sa = !0
            });
            G.hb(a, T) && (n.cb = !0);
            G.hb(a, W) && (N = !0);
            G.hb(a, M) && (g(), m())
        };
        this.reload = function() {
            D.reload()
        };
        this.oc = function(a, b) {
            if (N) u.Ch(a);
            else {
                if (b)
                    for (var c = x.o(b), e = c.length - 1; 0 <= e; e--) c[e].H = !0;
                else n.H = !0;
                d(a)
            }
        };
        this.na = function() {
            s.k()
        };
        this.update =
            function() {
                x.update();
                u.Qi()
        };
        this.reset = function() {
            return Q(!1)
        };
        this.J = A.c;
        this.wa = function() {
            var a = {};
            return function(b, c) {
                var d = x.c(b);
                return d ? t.Xc(a, d, c) : null
            }
        }();
        this.va = function() {
            var a = {};
            return function(b) {
                return (b = x.c(b)) ? t.Zc(a, b) : null
            }
        }();
        this.Ya = function() {
            var a = {};
            return function(b) {
                return (b = x.c(b)) ? t.Yc(a, b) : null
            }
        }();
        this.pc = function() {
            this.o({
                groups: e(function(a) {
                    return a.group.selected
                }),
                newState: !0,
                keepPrevious: !1
            });
            this.k({
                groups: e(function(a) {
                    return a.group.open
                }),
                newState: !0,
                keepPrevious: !1
            });
            this.c({
                groups: e(function(a) {
                    return a.group.exposed
                }),
                newState: !0,
                keepPrevious: !1
            })
        };
        this.za = function() {
            return e(function(a) {
                return a.Q
            })
        };
        this.c = function(a) {
            return D.submit(function() {
                return z.Qb(x.k(a, "exposed", !1), !1, !0, !1)
            })
        };
        this.Da = function() {
            return e(function(a) {
                return a.open
            })
        };
        this.k = function(a) {
            return D.submit(function() {
                return K.jb(x.k(a, "open", !0), !1, !1)
            })
        };
        this.Ka = function() {
            return e(function(a) {
                return a.selected
            })
        };
        this.o = function(a) {
            return D.submit(function() {
                O.select(x.k(a,
                    "selected", !0), !1);
                return (new X).I().M()
            })
        };
        this.rc = function(a) {
            a = x.c(a);
            return a === n ? v.reset(l.mc, Z.ha(l.nc)) : v.c(a, l.Ec, l.mc, Z.ha(l.nc))
        };
        this.Va = function(a) {
            return B.$a[a]
        };
        this.qc = function() {
            var a = ca;
            return {
                frames: a.frames,
                totalTime: a.totalTime,
                lastFrameTime: a.qd,
                lastInterFrameTime: a.rd,
                fps: a.ne
            }
        };
        var u = function() {
            function a(c, d) {
                var e = l.Ob && l.Ob.boundary;
                e && 2 < e.length ? n.n = e.map(function(a) {
                    return {
                        x: c * a.x,
                        y: d * a.y
                    }
                }) : n.n = [{
                    x: 0,
                    y: 0
                }, {
                    x: c,
                    y: 0
                }, {
                    x: c,
                    y: d
                }, {
                    x: 0,
                    y: d
                }];
                b()
            }

            function b() {
                n.ra = !0;
                n.O = n.n;
                n.A = U.A(n.n, n.A);
                U.k(n.n, n);
                U.k(n.n, n.da);
                n.Ab = Math.sqrt(n.da.fa / Math.PI)
            }
            return {
                yh: a,
                wi: function(b, c, e, f) {
                    L.stop();
                    var g = e / b,
                        h = f / c;
                    $.he(n, function(a) {
                        a.x = a.x * g + (Math.random() - 0.5) * e / 1E3;
                        a.y = a.y * h + (Math.random() - 0.5) * f / 1E3
                    });
                    a(e, f);
                    n.Oa = !0;
                    y.k(L.ib, !0, !1, function(a) {
                        var b = a.e;
                        if (b) {
                            y.o(a);
                            for (var c = b.length - 1; 0 <= c; c--) {
                                var d = b[c];
                                d.f = d.fc
                            }
                            a.Oa = !0
                        }
                    }) ? d(!1) : (y.J(n), k.options.Kd ? (d(!1), I.zf(), I.Rc()) : (y.c(L.ib), n.cb = !0, d(!1)))
                },
                Ch: function(a) {
                    var c = !1;
                    n.empty() || (b(), I.wb() || (c = y.k(L.ib, !1, !1), d(a)));
                    return c
                },
                Qi: function() {
                    $.Ha(n, function(a) {
                        a.empty() || y.o(a)
                    });
                    y.J(n);
                    k.options.Kd ? (I.zf(), $.Ha(n, function(a) {
                        a.empty() || L.Ee(a)
                    })) : ($.Ha(n, function(a) {
                        a.empty() || L.ib(n)
                    }), y.c(L.ib), n.cb = !0, d(!1))
                }
            }
        }(),
            D = function() {
                function a() {
                    0 === l.Fd && v.reset(0);
                    k.options.of(l.Ob);
                    x.na(l.Ob);
                    f();
                    g();
                    k.d.p("model:loaded", n, $.zc(n));
                    var b;
                    n.empty() || (n.open = !0, n.Ma = !0, l.Kd ? b = I.Rc() : (I.Mh(), b = h()), d(), 0 < l.Md ? (A.clear(), s.c(1)) : b = pa([b, e(1)]));
                    k.options.nf(l.Ob);
                    b && (k.options.sf(), b.K(function() {
                        q.c(k.options.rf)
                    }))
                }

                function d() {
                    var a = l.Qa,
                        c = l.Nc;
                    l.Qa = 0;
                    l.Nc = 0;
                    b.pc();
                    l.Qa = a;
                    l.Nc = c
                }

                function e(a, b) {
                    return 0 === l.ke || b ? (s.c(a), (new X).I().M()) : p.B.m({
                        opacity: s.c()
                    }).Vd(2).ba({
                        duration: l.ke,
                        D: {
                            opacity: {
                                end: a,
                                L: Z.ha(l.xg)
                            }
                        },
                        W: function() {
                            s.c(this.opacity)
                        }
                    }).Xa()
                }

                function h() {
                    $.Ha(n, function(a) {
                        a.Ea = !1
                    });
                    var a = new X,
                        b = new qa(a.I);
                    b.c();
                    n.Ea = !0;
                    C.c(n).K(b.k);
                    c(n, function Ya() {
                        this.T && this.n && (this.ra = this.Ea = !0, b.c(), C.c(this).K(b.k), b.c(), c(this, Ya).K(b.k))
                    });
                    return a.M()
                }

                function m() {
                    for (var a = 0; a < t.length; a++) {
                        var b =
                            t[a],
                            c = b.action();
                        G.N(c, "then") ? c.K(b.de.I) : b.de.I()
                    }
                    t = []
                }
                var r = !1,
                    t = [];
                return {
                    reload: function() {
                        r || (n.empty() ? a() : (L.stop(), p.c(), I.stop(), r = !0, pa(0 < l.Fd ? [C.k(), Q(!1)] : [e(0)]).K(function() {
                            e(0, !0);
                            r = !1;
                            a();
                            G.defer(m)
                        })))
                    },
                    submit: function(a) {
                        if (r) {
                            var b = new X;
                            t.push({
                                action: a,
                                de: b
                            });
                            return b.M()
                        }
                        return a()
                    }
                }
            }(),
            E, H = new qa(function() {
                E.I()
            }),
            I = function() {
                function a() {
                    f || (H.o() && (E = new X), H.c(), b(), f = !0, q.repeat(e));
                    return E.M()
                }

                function b() {
                    g = r.now()
                }

                function e() {
                    var b = r.now() - g > l.vi,
                        b = y.k(function(b) {
                            b.Ea = !0;
                            L.Ee(b);
                            H.c();
                            C.c(b).K(H.k);
                            H.c();
                            c(b, function() {
                                this.Ma = !0;
                                a()
                            }).K(H.k)
                        }, !0, b) || b;
                    d(!0);
                    b && (f = !1, H.k());
                    return b
                }
                var f = !1,
                    g;
                return {
                    Mh: function() {
                        y.c(L.ib)
                    },
                    Rc: a,
                    zf: b,
                    wb: function() {
                        return !H.o()
                    },
                    stop: function() {
                        q.cancel(e);
                        f = !1;
                        H.clear()
                    }
                }
            }(),
            L = function() {
                function a(b) {
                    var c = !b.empty();
                    if (c) {
                        for (var d = b.e, e = d.length - 1; 0 <= e; e--) {
                            var f = d[e];
                            f.f = f.fc
                        }
                        b.Oa = !0
                    }
                    return c
                }
                var b = [];
                return {
                    Ee: function(c) {
                        var d = k.options,
                            e = d.Rg;
                        0 < e ? Ca.Da(c, Ca.na(c, k.options.Od), function(a, c, f) {
                            c = "groups" === k.options.Nd ? f :
                                c;
                            H.c();
                            b.push(p.B.m(a).Za(c * d.Qg * e).ba({
                                duration: e,
                                D: {
                                    f: {
                                        start: a.Mf,
                                        end: a.fc,
                                        L: Z.ha(d.Sg)
                                    }
                                },
                                W: function() {
                                    this.f = Math.max(0, this.f);
                                    this.parent.Oa = !0;
                                    I.Rc()
                                }
                            }).bb(H.k).start())
                        }) : a(c) && I.Rc()
                    },
                    ib: a,
                    stop: function() {
                        for (var a = b.length - 1; 0 <= a; a--) b[a].stop();
                        b = []
                    }
                }
            }(),
            Q = function() {
                var a = !1;
                return function(b) {
                    if (a) return (new X).I().M();
                    a = !0;
                    var c = [];
                    c.push(v.reset(l.mc, Z.ha(l.nc)));
                    var d = new X;
                    z.Qb({
                        e: [],
                        Aa: !1,
                        xa: !1
                    }, b, !1, !0).K(function() {
                        K.jb({
                            e: [],
                            Aa: !1,
                            xa: !1
                        }, b, !1).K(d.I)
                    });
                    c.push(d.M());
                    return pa(c).K(function() {
                        a = !1;
                        b && l.tf()
                    })
                }
            }(),
            R = !1
    }

    function Wa() {
        return {
            version: "3.2.0",
            build: "200c52688b5d0fff5e0a6eaac8db8c20676095d1/200c5268",
            brandingAllowed: !1
        }
    };
    window.CarrotSearchFoamTree = function(a) {
        function l(a, b) {
            if (!m || m.exists(a)) switch (a) {
                case "selection":
                    return k.Ka();
                case "open":
                    return k.Da();
                case "exposure":
                    return k.za();
                case "state":
                    return k.va.apply(this, b);
                case "geometry":
                    return k.wa.apply(this, b);
                case "hierarchy":
                    return k.Ya.apply(this, b);
                case "imageData":
                    return k.J.apply(this, b);
                case "times":
                    return k.qc();
                case "onModelChanged":
                case "onRedraw":
                case "onRolloutStart":
                case "onRolloutComplete":
                case "onRelaxationStep":
                case "onGroupHover":
                case "onGroupOpenOrCloseChanging":
                case "onGroupExposureChanging":
                case "onGroupSelectionChanging":
                case "onGroupSelectionChanged":
                case "onGroupClick":
                case "onGroupDoubleClick":
                case "onGroupHold":
                    var c =
                        f[a];
                    return Array.isArray(c) ? c : [c];
                default:
                    return f[a]
            }
        }

        function h(a) {
            function d(a, b) {
                return G.N(e, a) ? (b(e[a]), delete e[a], 1) : 0
            }
            var e;
            if (0 === arguments.length) return 0;
            1 === arguments.length ? e = G.extend({}, arguments[0]) : 2 === arguments.length && (e = {}, e[arguments[0]] = arguments[1]);
            m && m.validate(e, b.Dh);
            var g = 0;
            k && (g += d("selection", k.o), g += d("open", k.k), g += d("exposure", k.c));
            var h = {};
            G.Ca(e, function(a, b) {
                if (f[b] !== a || G.Xb(a)) h[b] = a, g++;
                f[b] = a
            });
            0 < g && c(h);
            return g
        }

        function e(a, b) {
            var d = "on" + a.charAt(0).toUpperCase() +
                a.slice(1),
                e = f[d];
            f[d] = b(Array.isArray(e) ? e : [e]);
            e = {};
            e[d] = f[d];
            c(e)
        }

        function c(a) {
            (function() {
                function c(b, d) {
                    return G.N(a, b) || void 0 === d ? va.m(f[b], g) : d
                }
                b.Dh = f.logging;
                b.Ob = f.dataObject;
                b.q = f.pixelRatio;
                b.ob = f.wireframePixelRatio;
                b.Ra = f.initializer;
                b.vi = f.relaxationMaxDuration;
                b.Kd = f.relaxationVisible;
                b.xf = f.relaxationQualityThreshold;
                b.Ii = f.showZeroWeightGroups;
                b.ve = f.groupMinDiameter;
                b.eh = f.groupResizingBudget;
                b.Rg = f.groupGrowingDuration;
                b.Qg = f.groupGrowingDrag;
                b.Sg = f.groupGrowingEasing;
                b.Bg = f.groupBorderRadius;
                b.Bc = f.groupBorderWidth;
                b.Tb = f.groupBorderWidthScaling;
                b.ue = f.groupInsetWidth;
                b.Cg = f.groupBorderRadiusCorrection;
                b.ub = f.groupStrokeWidth;
                b.jd = f.groupSelectionOutlineWidth;
                b.ih = f.groupSelectionOutlineColor;
                b.xe = f.groupSelectionOutlineShadowSize;
                b.we = f.groupSelectionOutlineShadowColor;
                b.fh = f.groupSelectionFillHueShift;
                b.hh = f.groupSelectionFillSaturationShift;
                b.gh = f.groupSelectionFillLightnessShift;
                b.ye = f.groupSelectionStrokeHueShift;
                b.Ae = f.groupSelectionStrokeSaturationShift;
                b.ze = f.groupSelectionStrokeLightnessShift;
                b.Pg = f.groupFillType;
                b.Lg = f.groupFillGradientRadius;
                b.Ig = f.groupFillGradientCenterHueShift;
                b.Kg = f.groupFillGradientCenterSaturationShift;
                b.Jg = f.groupFillGradientCenterLightnessShift;
                b.Mg = f.groupFillGradientRimHueShift;
                b.Og = f.groupFillGradientRimSaturationShift;
                b.Ng = f.groupFillGradientRimLightnessShift;
                b.sh = f.groupStrokeType;
                b.ub = f.groupStrokeWidth;
                b.Be = f.groupStrokePlainHueShift;
                b.De = f.groupStrokePlainSaturationShift;
                b.Ce = f.groupStrokePlainLightnessShift;
                b.oh = f.groupStrokeGradientRadius;
                b.kh = f.groupStrokeGradientAngle;
                b.ph = f.groupStrokeGradientUpperHueShift;
                b.rh = f.groupStrokeGradientUpperSaturationShift;
                b.qh = f.groupStrokeGradientUpperLightnessShift;
                b.lh = f.groupStrokeGradientLowerHueShift;
                b.nh = f.groupStrokeGradientLowerSaturationShift;
                b.mh = f.groupStrokeGradientLowerLightnessShift;
                b.Tg = f.groupHoverFillHueShift;
                b.Vg = f.groupHoverFillSaturationShift;
                b.Ug = f.groupHoverFillLightnessShift;
                b.re = f.groupHoverStrokeHueShift;
                b.te = f.groupHoverStrokeSaturationShift;
                b.se = f.groupHoverStrokeLightnessShift;
                b.gb = f.groupExposureScale;
                b.Hg = f.groupExposureShadowColor;
                b.qe = f.groupExposureShadowSize;
                b.Ec = f.groupExposureZoomMargin;
                b.uh = f.groupUnexposureLightnessShift;
                b.vh = f.groupUnexposureSaturationShift;
                b.th = f.groupUnexposureLabelColorThreshold;
                b.Qa = f.exposeDuration;
                b.Rb = f.exposeEasing;
                b.Nc = f.openCloseDuration;
                b.Dg = va.m(f.groupColorDecorator, g);
                b.Eg = f.groupColorDecorator !== G.La;
                b.Yg = va.m(f.groupLabelDecorator, g);
                b.Zg = f.groupLabelDecorator !== G.La;
                b.Fg = va.m(f.groupContentDecorator, g);
                b.Dc = f.groupContentDecorator !== G.La;
                b.Gg = f.groupContentDecoratorTriggering;
                b.ri = f.rainbowStartColor;
                b.ki = f.rainbowEndColor;
                b.ii = f.rainbowColorDistribution;
                b.ji = f.rainbowColorDistributionAngle;
                b.ni = f.rainbowLightnessDistributionAngle;
                b.oi = f.rainbowLightnessShift;
                b.pi = f.rainbowLightnessShiftCenter;
                b.qi = f.rainbowSaturationCorrection;
                b.mi = f.rainbowLightnessCorrection;
                b.uf = f.parentFillOpacity;
                b.Lh = f.parentStrokeOpacity;
                b.vf = f.parentLabelOpacity;
                b.wf = f.parentOpacityBalancing;
                b.dh = f.groupLabelUpdateThreshold;
                b.$g = f.groupLabelFontFamily;
                b.bh = f.groupLabelMinFontSize;
                b.cj = f.groupLabelMaxFontSize;
                b.bj = f.groupLabelLineHeight;
                b.aj = f.groupLabelHorizontalPadding;
                b.ej = f.groupLabelVerticalPadding;
                b.dj = f.groupLabelMaxTotalHeight;
                b.Xg = f.groupLabelDarkColor;
                b.ah = f.groupLabelLightColor;
                b.Wg = f.groupLabelColorThreshold;
                b.Si = f.wireframeDrawMaxDuration;
                b.Ti = f.wireframeLabelDrawing;
                b.Ri = f.wireframeContentDecorationDrawing;
                b.Uf = f.wireframeToFinalFadeDuration;
                b.Ui = f.wireframeToFinalFadeDelay;
                b.yg = f.finalCompleteDrawMaxDuration;
                b.zg = f.finalIncrementalDrawMaxDuration;
                b.me = f.finalToWireframeFadeDuration;
                b.$c =
                    f.androidStockBrowserWorkaround;
                b.Fh = f.maxGroups;
                b.vd = f.maxGroupLevelsDrawn;
                b.Eh = f.maxGroupLabelLevelsDrawn;
                b.Od = f.rolloutStartPoint;
                b.Nd = f.rolloutMethod;
                b.zi = f.rolloutEasing;
                b.Md = f.rolloutDuration;
                b.Cf = f.rolloutScalingStrength;
                b.Ef = f.rolloutTranslationXStrength;
                b.Ff = f.rolloutTranslationYStrength;
                b.Bf = f.rolloutRotationStrength;
                b.Df = f.rolloutTransformationCenter;
                b.Di = f.rolloutPolygonDrag;
                b.Ei = f.rolloutPolygonDuration;
                b.Ai = f.rolloutLabelDelay;
                b.Bi = f.rolloutLabelDrag;
                b.Ci = f.rolloutLabelDuration;
                b.yi =
                    f.rolloutChildGroupsDrag;
                b.xi = f.rolloutChildGroupsDelay;
                b.bi = f.pullbackStartPoint;
                b.Wh = f.pullbackMethod;
                b.Sh = f.pullbackEasing;
                b.hj = f.pullbackType;
                b.Fd = f.pullbackDuration;
                b.ai = f.pullbackScalingStrength;
                b.di = f.pullbackTranslationXStrength;
                b.ei = f.pullbackTranslationYStrength;
                b.$h = f.pullbackRotationStrength;
                b.ci = f.pullbackTransformationCenter;
                b.Xh = f.pullbackPolygonDelay;
                b.Yh = f.pullbackPolygonDrag;
                b.Zh = f.pullbackPolygonDuration;
                b.Th = f.pullbackLabelDelay;
                b.Uh = f.pullbackLabelDrag;
                b.Vh = f.pullbackLabelDuration;
                b.Ph = f.pullbackChildGroupsDelay;
                b.Qh = f.pullbackChildGroupsDrag;
                b.Rh = f.pullbackChildGroupsDuration;
                b.ke = f.fadeDuration;
                b.xg = f.fadeEasing;
                b.Vi = f.zoomMouseWheelFactor;
                b.mc = f.zoomMouseWheelDuration;
                b.nc = f.zoomMouseWheelEasing;
                b.Gh = f.maxLabelSizeForTitleBar;
                b.Li = f.titleBarFontFamily;
                b.Pf = f.titleBarBackgroundColor;
                b.Qf = f.titleBarTextColor;
                b.Mi = f.titleBarMinFontSize;
                b.Ud = f.titleBarMaxFontSize;
                b.Ni = f.titleBarTextPaddingLeftRight;
                b.Oi = f.titleBarTextPaddingTopBottom;
                b.Ki = f.titleBarDecorator;
                b.Yi = f.attributionText;
                b.Wi = f.attributionLogo;
                b.Zi = f.attributionUrl;
                b.Ge = f.interactionHandler;
                b.of = c("onModelChanging", b.of);
                b.nf = c("onModelChanged", b.nf);
                b.pf = c("onRedraw", b.pf);
                b.sf = c("onRolloutStart", b.sf);
                b.rf = c("onRolloutComplete", b.rf);
                b.qf = c("onRelaxationStep", b.qf);
                b.tf = c("onViewReset", b.tf);
                b.ff = c("onGroupOpenOrCloseChanging", b.ff);
                b.ef = c("onGroupOpenOrCloseChanged", b.ef);
                b.$e = c("onGroupExposureChanging", b.$e);
                b.Ze = c("onGroupExposureChanged", b.Ze);
                b.hf = c("onGroupSelectionChanging", b.hf);
                b.gf = c("onGroupSelectionChanged",
                    b.gf);
                b.bf = c("onGroupHover", b.bf);
                b.Ue = c("onGroupClick", b.Ue);
                b.Ve = c("onGroupDoubleClick", b.Ve);
                b.af = c("onGroupHold", b.af);
                b.df = c("onGroupMouseWheel", b.df);
                b.cf = c("onGroupMouseDown", b.cf);
                b.Ye = c("onGroupDragStart", b.Ye);
                b.We = c("onGroupDrag", b.We);
                b.Xe = c("onGroupDragEnd", b.Xe);
                b.lf = c("onGroupTransformStart", b.lf);
                b.jf = c("onGroupTransform", b.jf);
                b.kf = c("onGroupTransformEnd", b.kf);
                b.mf = c("onKeyUp", b.mf)
            })();
            b.si = V.za(b.ri);
            b.li = V.za(b.ki);
            b.jh = V.za(b.we);
            b.Xi = null;
            k && (k.$a(a), G.N(a, "dataObject") && k.reload())
        }

        function d(a) {
            return function() {
                return a.apply(this, arguments).Ag(g)
            }
        }
        window.CarrotSearchFoamTree.supported || na.va("not supported.");
        var g = this,
            m = window.CarrotSearchFoamTree.asserts,
            f = G.extend({}, window.CarrotSearchFoamTree.defaults),
            b = {};
        h(a);
        (a = f.element || document.getElementById(f.id)) || na.va("embedding failed.");
        f.element = a;
        var k = new ab(a, b, f);
        k.u();
        var n = {
            get: function(a) {
                return 0 === arguments.length ? G.extend({}, f) : l(arguments[0], Array.prototype.slice.call(arguments, 1))
            },
            set: h,
            on: function(a, b) {
                e(a,
                    function(a) {
                        a.push(b);
                        return a
                    })
            },
            off: function(a, b) {
                e(a, function(a) {
                    return a.filter(function(a) {
                        return a !== b
                    })
                })
            },
            resize: k.na,
            redraw: k.oc,
            update: k.update,
            select: d(k.o),
            expose: d(k.c),
            open: d(k.k),
            reset: d(k.reset),
            zoom: d(k.rc),
            trigger: function(a, b) {
                var c = k.Va(a);
                c && c(b)
            },
            dispose: function() {
                function a() {
                    throw "FoamTree instance disposed";
                }
                k.fb();
                G.Ca(n, function(b, c) {
                    "dispose" !== c && (g[c] = a)
                })
            }
        };
        G.Ca(n, function(a, b) {
            g[b] = a
        });
        k.reload()
    };
    window["CarrotSearchFoamTree.asserts"] && (window.CarrotSearchFoamTree.asserts = window["CarrotSearchFoamTree.asserts"], delete window["CarrotSearchFoamTree.asserts"]);
    var bb = window.CarrotSearchFoamTree,
        cb, db = document.createElement("canvas");
    cb = !(!db.getContext || !db.getContext("2d"));
    bb.supported = cb;
    window.CarrotSearchFoamTree.version = Wa;
    window.CarrotSearchFoamTree.defaults = Object.freeze({
        id: void 0,
        element: void 0,
        logging: !1,
        dataObject: void 0,
        pixelRatio: 1,
        wireframePixelRatio: 1,
        initializer: "fisheye",
        relaxationMaxDuration: 3E3,
        relaxationVisible: !1,
        relaxationQualityThreshold: 1,
        showZeroWeightGroups: !0,
        groupMinDiameter: 10,
        maxGroups: 5E4,
        maxGroupLevelsDrawn: 4,
        maxGroupLabelLevelsDrawn: 3,
        groupGrowingDuration: 0,
        groupGrowingEasing: "bounce",
        groupGrowingDrag: 0,
        groupResizingBudget: 2,
        groupBorderRadius: 0.3,
        groupBorderWidth: 4,
        groupBorderWidthScaling: 0.6,
        groupInsetWidth: 6,
        groupBorderRadiusCorrection: 0.45,
        groupSelectionOutlineWidth: 5,
        groupSelectionOutlineColor: "#222",
        groupSelectionOutlineShadowSize: 0,
        groupSelectionOutlineShadowColor: "#fff",
        groupSelectionFillHueShift: 0,
        groupSelectionFillSaturationShift: 0,
        groupSelectionFillLightnessShift: 0,
        groupSelectionStrokeHueShift: 0,
        groupSelectionStrokeSaturationShift: 0,
        groupSelectionStrokeLightnessShift: -10,
        groupFillType: "gradient",
        groupFillGradientRadius: 1,
        groupFillGradientCenterHueShift: 0,
        groupFillGradientCenterSaturationShift: 0,
        groupFillGradientCenterLightnessShift: 20,
        groupFillGradientRimHueShift: 0,
        groupFillGradientRimSaturationShift: 0,
        groupFillGradientRimLightnessShift: -5,
        groupStrokeType: "plain",
        groupStrokeWidth: 1.5,
        groupStrokePlainHueShift: 0,
        groupStrokePlainSaturationShift: 0,
        groupStrokePlainLightnessShift: -10,
        groupStrokeGradientRadius: 1,
        groupStrokeGradientAngle: 45,
        groupStrokeGradientUpperHueShift: 0,
        groupStrokeGradientUpperSaturationShift: 0,
        groupStrokeGradientUpperLightnessShift: 20,
        groupStrokeGradientLowerHueShift: 0,
        groupStrokeGradientLowerSaturationShift: 0,
        groupStrokeGradientLowerLightnessShift: -20,
        groupHoverFillHueShift: 0,
        groupHoverFillSaturationShift: 0,
        groupHoverFillLightnessShift: 20,
        groupHoverStrokeHueShift: 0,
        groupHoverStrokeSaturationShift: 0,
        groupHoverStrokeLightnessShift: -10,
        groupExposureScale: 1.15,
        groupExposureShadowColor: "rgba(0, 0, 0, 0.5)",
        groupExposureShadowSize: 50,
        groupExposureZoomMargin: 0.1,
        groupUnexposureLightnessShift: 65,
        groupUnexposureSaturationShift: -65,
        groupUnexposureLabelColorThreshold: 0.35,
        exposeDuration: 700,
        exposeEasing: "squareInOut",
        groupColorDecorator: G.La,
        groupLabelDecorator: G.La,
        groupContentDecorator: G.La,
        groupContentDecoratorTriggering: "onLayoutDirty",
        openCloseDuration: 500,
        rainbowColorDistribution: "radial",
        rainbowColorDistributionAngle: -45,
        rainbowLightnessDistributionAngle: 45,
        rainbowSaturationCorrection: 0.1,
        rainbowLightnessCorrection: 0.4,
        rainbowStartColor: "hsla(0, 100%, 55%, 1)",
        rainbowEndColor: "hsla(359, 100%, 55%, 1)",
        rainbowLightnessShift: 50,
        rainbowLightnessShiftCenter: 0.2,
        parentFillOpacity: 0.7,
        parentStrokeOpacity: 1,
        parentLabelOpacity: 1,
        parentOpacityBalancing: !0,
        wireframeDrawMaxDuration: 15,
        wireframeLabelDrawing: "auto",
        wireframeContentDecorationDrawing: "auto",
        wireframeToFinalFadeDuration: 500,
        wireframeToFinalFadeDelay: 300,
        finalCompleteDrawMaxDuration: 80,
        finalIncrementalDrawMaxDuration: 100,
        finalToWireframeFadeDuration: 200,
        androidStockBrowserWorkaround: w.He(),
        groupLabelFontFamily: "sans-serif",
        groupLabelLineHeight: 1.05,
        groupLabelHorizontalPadding: 1,
        groupLabelVerticalPadding: 1,
        groupLabelMinFontSize: 6,
        groupLabelMaxFontSize: 160,
        groupLabelMaxTotalHeight: 0.9,
        groupLabelUpdateThreshold: 0.05,
        groupLabelDarkColor: "#000",
        groupLabelLightColor: "#fff",
        groupLabelColorThreshold: 0.35,
        rolloutStartPoint: "center",
        rolloutEasing: "squareOut",
        rolloutMethod: "groups",
        rolloutDuration: 2E3,
        rolloutScalingStrength: -0.7,
        rolloutTranslationXStrength: 0,
        rolloutTranslationYStrength: 0,
        rolloutRotationStrength: -0.7,
        rolloutTransformationCenter: 0.7,
        rolloutPolygonDrag: 0.1,
        rolloutPolygonDuration: 0.5,
        rolloutLabelDelay: 0.8,
        rolloutLabelDrag: 0.1,
        rolloutLabelDuration: 0.5,
        rolloutChildGroupsDrag: 0.1,
        rolloutChildGroupsDelay: 0.2,
        pullbackStartPoint: "center",
        pullbackEasing: "squareIn",
        pullbackMethod: "groups",
        pullbackDuration: 1500,
        pullbackScalingStrength: -0.7,
        pullbackTranslationXStrength: 0,
        pullbackTranslationYStrength: 0,
        pullbackRotationStrength: -0.7,
        pullbackTransformationCenter: 0.7,
        pullbackPolygonDelay: 0.3,
        pullbackPolygonDrag: 0.1,
        pullbackPolygonDuration: 0.8,
        pullbackLabelDelay: 0,
        pullbackLabelDrag: 0.1,
        pullbackLabelDuration: 0.3,
        pullbackChildGroupsDelay: 0.1,
        pullbackChildGroupsDrag: 0.1,
        pullbackChildGroupsDuration: 0.3,
        fadeDuration: 700,
        fadeEasing: "cubicInOut",
        zoomMouseWheelFactor: 1.5,
        zoomMouseWheelDuration: 500,
        zoomMouseWheelEasing: "squareOut",
        maxLabelSizeForTitleBar: 8,
        titleBarFontFamily: null,
        titleBarBackgroundColor: "rgba(0, 0, 0, 0.5)",
        titleBarTextColor: "rgba(255, 255, 255, 1)",
        titleBarMinFontSize: 10,
        titleBarMaxFontSize: 40,
        titleBarTextPaddingLeftRight: 20,
        titleBarTextPaddingTopBottom: 15,
        titleBarDecorator: G.La,
        attributionText: null,
        attributionLogo: null,
        attributionUrl: "http://carrotsearch.com/foamtree",
        interactionHandler: w.Fe() ?
            "hammerjs" : "builtin",
        onModelChanging: [],
        onModelChanged: [],
        onRedraw: [],
        onRolloutStart: [],
        onRolloutComplete: [],
        onRelaxationStep: [],
        onViewReset: [],
        onGroupOpenOrCloseChanging: [],
        onGroupOpenOrCloseChanged: [],
        onGroupExposureChanging: [],
        onGroupExposureChanged: [],
        onGroupSelectionChanging: [],
        onGroupSelectionChanged: [],
        onGroupHover: [],
        onGroupClick: [],
        onGroupDoubleClick: [],
        onGroupHold: [],
        onGroupMouseWheel: [],
        onGroupMouseDown: [],
        onGroupDragStart: [],
        onGroupDrag: [],
        onGroupDragEnd: [],
        onGroupTransformStart: [],
        onGroupTransform: [],
        onGroupTransformEnd: [],
        onKeyUp: [],
        selection: null,
        open: null,
        exposure: null,
        imageData: null,
        hierarchy: null,
        geometry: null,
        state: null,
        times: null
    });
    window.CarrotSearchFoamTree.geometry = Object.freeze({
        rectangleInPolygon: function(a, l, h, e, c, d, g) {
            c = G.F(c, 1);
            d = G.F(d, 0.5);
            g = G.F(g, 0.5);
            a = U.Zd(a, {
                x: l,
                y: h
            }, e, d, g) * c;
            return {
                x: l - a * e * d,
                y: h - a * g,
                w: a * e,
                h: a
            }
        },
        circleInPolygon: function(a, l, h) {
            return U.Zf(a, {
                x: l,
                y: h
            })
        },
        stabPolygon: function(a, l, h, e) {
            return U.ig(a, {
                x: l,
                y: h
            }, e)
        },
        polygonCentroid: function(a) {
            a = U.k(a, {});
            return {
                x: a.x,
                y: a.y,
                area: a.fa
            }
        },
        boundingBox: function(a) {
            for (var l = a[0].x, h = a[0].y, e = a[0].x, c = a[0].y, d = 1; d < a.length; d++) {
                var g = a[d];
                g.x < l && (l = g.x);
                g.y <
                    h && (h = g.y);
                g.x > e && (e = g.x);
                g.y > c && (c = g.y)
            }
            return {
                x: l,
                y: h,
                w: e - l,
                h: c - h
            }
        }
    });
})();