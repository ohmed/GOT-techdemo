/*
 * GOT
 * @author: ohmed
 * Animation handler
*/

var AnimationHandler = function ( target ) {

    var self = this;

    var currentFrame, nextFrame,

        parentClass,
        timeout, frameChangeInterval;

    if ( target.type === 'Unit' ) {

        parentClass = GOT.landscape.units;

    } else if ( target.type === 'Building' || target.type === 'SubBuilding' ) {

        parentClass = GOT.landscape.buildings;

    } else {

        console.log( 'Animation handler error, unknown target type.' );
        return;

    }

    //

    this.loop = false;
    this.duration = 0;
    this.status = 'stopped';

    this.set = function ( animationName, duration, loop, revers ) {

        var animation = target.animFrames[ animationName ],
            dF, ddF;

        if ( !animation ) {

            console.log( 'Animation not found.' );
            return;

        }

        self.duration   = duration = duration || self.duration;
        self.loop       = loop = loop || self.loop;

        currentFrame = ( !revers ) ? animation.start : animation.end;
        nextFrame = ( !revers ) ? animation.end : animation.start;

        dF = nextFrame - currentFrame;
        ddF = dF / Math.abs( dF );

        clearTimeout(timeout);
        clearInterval(frameChangeInterval);

        if ( nextFrame === currentFrame ) {

            changeFrame(0, 1);
            return;

        }

        frameChangeInterval = setInterval( function ( df, dur ) {

            changeFrame(df, dur);

        }, duration / Math.abs( dF ) , ddF, duration / Math.abs( dF ) );

        changeFrame(ddF, duration / Math.abs( dF ));

        if ( !loop ) {

            timeout = setTimeout( function () {

                self.stop.call(self);

            }, duration );

        } else {

            timeout = setTimeout( function () {

                self.set.call(self, animationName, duration, self.loop, !revers);

            }, duration );

        }

        self.status = 'playing';

    };

    this.pause = function () {

        // todo

    };

    this.resume = function () {

        // todo

    };

    this.stop = function () {

        self.status = 'stopped';
        self.loop = false;

        clearInterval(timeout);

        parentClass.stopAnimation.call(parentClass, target);

    };

    this.showPart = function ( partName ) {

        parentClass.changeVisibility(target, partName, 'show');

    };

    this.hidePart = function ( partName ) {

        parentClass.changeVisibility(target, partName, 'hide');

    };

    this.hideAll = function () {

        parentClass.hideAll(target);

    };

    this.setFrame = function ( frame ) {

        parentClass.setAnimation(target, frame, frame, 0);

    };

    function changeFrame ( deltaFrame, duration ) {

        parentClass.setAnimation(target, currentFrame, currentFrame + deltaFrame, duration);
        currentFrame += deltaFrame;

        if ( currentFrame === nextFrame ) {

            clearInterval(frameChangeInterval);
            self.status = 'stopped';

        }

    };

    AnimationHandler.addToList( target );

};

AnimationHandler.list = [];

AnimationHandler.addToList = function ( object ) {

    // todo, will be changed

    this.list.push( object );

};

AnimationHandler.removeFromList = function ( ) {

    // todo

};
