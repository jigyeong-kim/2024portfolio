function randomRange(n1, n2) {
    return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
}
(function($){
    $.fn.globalBanner = function(settings, standard){

        var _this = this;
        
        settings = jQuery.extend({
            banner_play:''
            , banner_stop:''
            , banner_prev:''
            , banner_next:''
            , banner_current_page:''
            , banner_total_page:''
            , banner_control_pin:''
            , banner_child_tag:'li'
            , effect:'fadeIn'
            , stop_time:3000
            , repeat:true
            , repeat_time:3000
            , auto_play:true
            , current_page:1
            , random:false
            , _ind:_this.index()
            , auto_hide_controls:true
        }, settings);
        
        var opts = []; 
        opts = $.extend({}, $.fn.globalBanner.defaults, settings); 
        
        return this.each(function () {
            
            var _this = this;
            
            $.fn.extend(this, globalBanner);
            
            this.opts = opts;
            this.init();
            
            $(window).bind("orientationchange resize", function (){
                _this.resize(_this);
            });
        });
    };
        
    var globalBanner = {
        init : function(){
            var _this = this;
            
            this._tg = $(this);

            this.runtime_interval = null;
            this.is_banner_run = true;

            this.child = this._tg.children(this.opts.banner_child_tag);
            this.total_page = this.child.size();

            if(this.opts.random){
                var randumNumber = randomRange(1,this.total_page);
                this.current_page = randumNumber;
            }else {
                this.current_page = this.opts.current_page;
            }

            this.prev_page = this.total_page;
            this.next_page = this.current_page + 1;

            if(this.opts.banner_total_page){
                $(this.opts.banner_total_page).html(this.total_page);
            }
            if(this.opts.banner_current_page){
                $(this.opts.banner_current_page).html(this.current_page);
            }
            
            if(this.opts.banner_play){
                $(this.opts.banner_play).bind('click', function(){
                    $(_this).removeClass('stop').removeClass('play').addClass('play');
                    clearInterval(_this.runtime_interval);
                    _this.runtime_interval = setInterval(function(){
                        _this.startBanner();
                    }, _this.opts.stop_time);
                });
                $(this.opts.banner_play).addClass('slideOptBtns');
                if(this.opts.auto_hide_controls){
                    $(this.opts.banner_play).hide();
                    $(this.opts.banner_play).bind('mouseenter', function(){
                        $('.slideOptBtns').show();
                    });
                    $(this.opts.banner_play).bind('mouseleave', function(){
                        $('.slideOptBtns').hide();
                    });
                }
            }
            
            if(this.opts.banner_stop){
                $(this.opts.banner_stop).bind('click', function(){
                    $(_this).removeClass('stop').removeClass('play').addClass('stop');
                    _this.stopBanner();
                });
                $(this.opts.banner_stop).addClass('slideOptBtns');
                if(this.opts.auto_hide_controls){
                    $(this.opts.banner_stop).hide();
                    $(this.opts.banner_stop).bind('mouseenter', function(){
                        $('.slideOptBtns').show();
                    });
                    $(this.opts.banner_stop).bind('mouseleave', function(){
                        $('.slideOptBtns').hide();
                    });
                }
            }

            if(this.opts.banner_prev){
                $(this.opts.banner_prev).bind('click', function(){
                    _this.showPrev();
                });
                $(this.opts.banner_prev).addClass('slideOptBtns');
                if(this.opts.auto_hide_controls){
                    $(this.opts.banner_prev).hide();
                    $(this.opts.banner_prev).bind('mouseenter', function(){
                        $('.slideOptBtns').show();
                    });
                    $(this.opts.banner_prev).bind('mouseleave', function(){
                        $('.slideOptBtns').hide();
                    });
                }
            }

            if(this.opts.banner_next){
                $(this.opts.banner_next).bind('click', function(){
                    _this.showNext();
                });
                $(this.opts.banner_next).addClass('slideOptBtns');
                if(this.opts.auto_hide_controls){
                    $(this.opts.banner_next).hide();
                    $(this.opts.banner_next).bind('mouseenter', function(){
                        $('.slideOptBtns').show();
                    });
                    $(this.opts.banner_next).bind('mouseleave', function(){
                        $('.slideOptBtns').hide();
                    });
                }
            }

            if(this.opts.banner_control_pin){
                var control_pin_html = '';
                for(var p = 0; p < this.total_page; p++){
                    control_pin_html += '<a href="#none">' + p + '</a>';
                }
                $(this.opts.banner_control_pin).append(control_pin_html);
                $(this.opts.banner_control_pin).children('a').each(function(){
                    $(this).bind('click', function(){
                        _this.showPin($(this).index());
                    });
                });
                $(this.opts.banner_control_pin).addClass('slideOptBtns');
                if(this.opts.auto_hide_controls){
                    $(this.opts.banner_control_pin).hide();
                    $(this.opts.banner_control_pin).bind('mouseenter', function(){
                        $('.slideOptBtns').show();
                    });
                    $(this.opts.banner_control_pin).bind('mouseleave', function(){
                        $('.slideOptBtns').hide();
                    });
                }
            }

            $(this.child).bind('mouseenter', function(){
                if(!$(_this).hasClass('stop')){
                    _this.stopBanner();
                }
                
                if(_this.opts.auto_hide_controls){
                    if(_this.opts.banner_play){
                        $('.slideOptBtns').show();
                    }
    
                    if(_this.opts.banner_stop){
                        $('.slideOptBtns').show();
                    }
    
                    if(_this.opts.banner_prev){
                        $('.slideOptBtns').show();
                    }
    
                    if(_this.opts.banner_next){
                        $('.slideOptBtns').show();
                    }
    
                    if(_this.opts.banner_control_pin){
                        $('.slideOptBtns').show();
                    }
                }
            });
            $(this.child).bind('mouseleave', function(){
                if(!$(_this).hasClass('stop')){
                    clearInterval(_this.runtime_interval);
                    _this.runtime_interval = setInterval(function(){
                        _this.startBanner();
                    }, _this.opts.stop_time);
                }
                
                if(_this.opts.auto_hide_controls){
                    if(_this.opts.banner_play){
                        $('.slideOptBtns').hide();
                    }
    
                    if(_this.opts.banner_stop){
                        $('.slideOptBtns').hide();
                    }
    
                    if(_this.opts.banner_prev){
                        $('.slideOptBtns').hide();
                    }
    
                    if(_this.opts.banner_next){
                        $('.slideOptBtns').hide();
                    }
    
                    if(_this.opts.banner_control_pin){
                        $('.slideOptBtns').hide();
                    }
                }
            });

            this.child.each(function(){
                $(this).hide();
            });
            
            this.startBanner();
        },
        
        startBanner: function(){
            var _this = this;

            clearInterval(this.runtime_interval);
            this.runtime_interval = null;
            this.is_banner_run = true;

            if(this.opts.banner_current_page){
                $(this.opts.banner_current_page).html(this.current_page);
            }

            if(this.opts.banner_control_pin){
                this.activePin();
            }

            if(this.opts.effect == 'fadeIn'){
                this.child.eq(this.prev_page - 1).fadeOut(function(){
                    _this.child.eq(_this.current_page - 1).fadeIn(function(){
                        _this.showReset();
                    });
                });
            }else if(this.opts.effect == 'toLeft'){
                this.child.show();
                this._tg.animate({'left':(this.child.width() * (this.current_page - 1)) * -1});
                this.showReset();
            }else{
                this.child.eq(this.prev_page - 1).hide();
                this.child.eq(this.current_page - 1).show();
                this.showReset();
            }
        
            return;
        },

        stopBanner: function(){
            clearInterval(this.runtime_interval);
            this.runtime_interval = null;

            return false;
        },

        showReset: function(){
            var _this = this;

            this.is_banner_run = false;

            if(this.opts.auto_play == true){
                clearInterval(this.runtime_interval);
                this.runtime_interval = setInterval(function(){
                    _this.startBanner();
                }, _this.opts.stop_time);
            }

            this.current_page++;

            this.prev_page = this.current_page - 1;
            this.next_page = this.current_page + 1;
            if(this.current_page > this.total_page){
                this.current_page = 1;
                this.prev_page = this.total_page;
                this.next_page = this.current_page + 1;
            }

            return;
        },

        showPrev: function(){
            if(this.is_banner_run == true){
                return false;
            }

            this.current_page = this.prev_page - 1;

            this.prev_page = this.current_page + 1;
            this.next_page = this.current_page - 1;
            if(this.current_page < 1){
                this.current_page = this.total_page;
                this.prev_page = 1;
                this.next_page = 1;
            }
            this.startBanner();

            return false;
        },

        showNext: function(){
            if(this.is_banner_run == true){
                return false;
            }

            this.current_page = this.next_page - 1;

            this.prev_page = this.current_page - 1;
            this.next_page = this.current_page + 1;
            if(this.current_page > this.total_page){
                this.current_page = 1;
                this.prev_page = this.total_page;
                this.next_page = this.current_page + 1;
            }
            this.startBanner();

            return false;
        },

        showPin: function(page){
            if(this.is_banner_run == true){
                return false;
            }

            this.current_page = page + 1;

            this.prev_page = this.prev_page;
            this.next_page = this.current_page + 1;
            this.startBanner();

            return false;
        },

        activePin: function(){
            $(this.opts.banner_control_pin).children('a').each(function(){
                $(this).removeClass('active');
            });
            $(this.opts.banner_control_pin).children('a').eq(this.current_page - 1).addClass('active');
        },
        
        repe: function(){
            if(this.opts.repeat==true){
                var _this = this;
                
                setTimeout(function(){
                    _this.showBanner()
                }, _this.opts.repeat_time); 
            };          
        },
        
        resize: function(){         
            
        }
    }// 전체 끝.
        
})(jQuery);
