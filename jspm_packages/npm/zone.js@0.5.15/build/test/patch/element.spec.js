/* */ 
"format cjs";
var util_1 = require('../util');
describe('element', function () {
    var button;
    var testZone = global.zone.fork();
    beforeEach(function () {
        button = document.createElement('button');
        document.body.appendChild(button);
    });
    afterEach(function () {
        document.body.removeChild(button);
    });
    // https://github.com/angular/zone.js/issues/190
    it('should work when addEventListener / removeEventListener are called in the global context', function () {
        var clickEvent = document.createEvent('Event');
        var callCount = 0;
        clickEvent.initEvent('click', true, true);
        var listener = function (event) {
            callCount++;
            expect(global.zone).toBeDirectChildOf(testZone);
            expect(event).toBe(clickEvent);
        };
        testZone.run(function () {
            // `this` would be null inside the method when `addEventListener` is called from strict mode
            // it would be `window`:
            // - when called from non strict-mode,
            // - when `window.addEventListener` is called explicitely.
            addEventListener('click', listener);
        });
        button.dispatchEvent(clickEvent);
        expect(callCount).toEqual(1);
        removeEventListener('click', listener);
        button.dispatchEvent(clickEvent);
        expect(callCount).toEqual(1);
    });
    it('should work with addEventListener when called with a function listener', function () {
        var clickEvent = document.createEvent('Event');
        clickEvent.initEvent('click', true, true);
        testZone.run(function () {
            button.addEventListener('click', function (event) {
                expect(global.zone).toBeDirectChildOf(testZone);
                expect(event).toBe(clickEvent);
            });
        });
        button.dispatchEvent(clickEvent);
    });
    it('should work with addEventListener when called with an EventListener-implementing listener', function () {
        var eventListener = {
            x: 5,
            handleEvent: function (event) {
                // Test that context is preserved
                expect(this.x).toBe(5);
                expect(event).toBe(clickEvent);
                expect(global.zone).toBeDirectChildOf(testZone);
            }
        };
        var clickEvent = document.createEvent('Event');
        clickEvent.initEvent('click', true, true);
        testZone.run(function () {
            button.addEventListener('click', eventListener);
        });
        button.dispatchEvent(clickEvent);
    });
    it('should respect removeEventListener when called with a function listener', function () {
        var log = '';
        var logFunction = function logFunction() {
            log += 'a';
        };
        button.addEventListener('click', logFunction);
        button.addEventListener('focus', logFunction);
        button.click();
        expect(log).toEqual('a');
        var focusEvent = document.createEvent('Event');
        focusEvent.initEvent('focus', true, true);
        button.dispatchEvent(focusEvent);
        expect(log).toEqual('aa');
        button.removeEventListener('click', logFunction);
        button.click();
        expect(log).toEqual('aa');
    });
    it('should respect removeEventListener with an EventListener-implementing listener', function () {
        var eventListener = {
            x: 5,
            handleEvent: jasmine.createSpy('handleEvent')
        };
        button.addEventListener('click', eventListener);
        button.removeEventListener('click', eventListener);
        button.click();
        expect(eventListener.handleEvent).not.toHaveBeenCalled();
    });
    it('should have no effect while calling addEventListener without listener', function () {
        var eventListenerZone = global.zone.fork({
            addEventListener: jasmine.createSpy('addEventListener')
        });
        expect(function () {
            eventListenerZone.run(function () {
                button.addEventListener('click', null);
                button.addEventListener('click', undefined);
            });
        }).not.toThrowError();
        expect(eventListenerZone.addEventListener).toHaveBeenCalledWith('click', null);
        expect(eventListenerZone.addEventListener).toHaveBeenCalledWith('click', undefined);
    });
    it('should have no effect while calling removeEventListener without listener', function () {
        var eventListenerZone = global.zone.fork({
            removeEventListener: jasmine.createSpy('removeEventListener')
        });
        expect(function () {
            eventListenerZone.run(function () {
                button.removeEventListener('click', null);
                button.removeEventListener('click', undefined);
            });
        }).not.toThrowError();
        expect(eventListenerZone.removeEventListener).toHaveBeenCalledWith('click', null);
        expect(eventListenerZone.removeEventListener).toHaveBeenCalledWith('click', undefined);
    });
    it('should only add a listener once for a given set of arguments', function () {
        var log = [];
        var clickEvent = document.createEvent('Event');
        function listener() {
            log.push('listener');
        }
        clickEvent.initEvent('click', true, true);
        button.addEventListener('click', listener);
        button.addEventListener('click', listener);
        button.addEventListener('click', listener);
        button.dispatchEvent(clickEvent);
        button.removeEventListener('click', listener);
        button.dispatchEvent(clickEvent);
        expect(log).toEqual([
            'listener'
        ]);
    });
    it('should correctly handle capturing versus nonCapturing eventListeners', function () {
        var log = [];
        var clickEvent = document.createEvent('Event');
        function capturingListener() {
            log.push('capturingListener');
        }
        function bubblingListener() {
            log.push('bubblingListener');
        }
        clickEvent.initEvent('click', true, true);
        document.body.addEventListener('click', capturingListener, true);
        document.body.addEventListener('click', bubblingListener);
        button.dispatchEvent(clickEvent);
        expect(log).toEqual([
            'capturingListener',
            'bubblingListener'
        ]);
    });
    it('should correctly handle a listener that is both capturing and nonCapturing', function () {
        var log = [];
        var clickEvent = document.createEvent('Event');
        function listener() {
            log.push('listener');
        }
        clickEvent.initEvent('click', true, true);
        document.body.addEventListener('click', listener, true);
        document.body.addEventListener('click', listener);
        button.dispatchEvent(clickEvent);
        document.body.removeEventListener('click', listener, true);
        document.body.removeEventListener('click', listener);
        button.dispatchEvent(clickEvent);
        expect(log).toEqual([
            'listener',
            'listener'
        ]);
    });
    describe('onclick', function () {
        function supportsOnClick() {
            var div = document.createElement('div');
            var clickPropDesc = Object.getOwnPropertyDescriptor(div, 'onclick');
            return !(EventTarget &&
                div instanceof EventTarget &&
                clickPropDesc && clickPropDesc.value === null);
        }
        supportsOnClick.message = 'Supports Element#onclick patching';
        util_1.ifEnvSupports(supportsOnClick, function () {
            it('should spawn new child zones', function () {
                testZone.run(function () {
                    button.onclick = function () {
                        expect(global['zoneA']).toBeDirectChildOf(testZone);
                    };
                });
                button.click();
            });
        });
        it('should only allow one onclick handler', function () {
            var log = '';
            button.onclick = function () {
                log += 'a';
            };
            button.onclick = function () {
                log += 'b';
            };
            button.click();
            expect(log).toEqual('b');
        });
        it('should handle removing onclick', function () {
            var log = '';
            button.onclick = function () {
                log += 'a';
            };
            button.onclick = null;
            button.click();
            expect(log).toEqual('');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdC9wYXRjaC9lbGVtZW50LnNwZWMudHMiXSwibmFtZXMiOlsibG9nRnVuY3Rpb24iLCJsaXN0ZW5lciIsImNhcHR1cmluZ0xpc3RlbmVyIiwiYnViYmxpbmdMaXN0ZW5lciIsInN1cHBvcnRzT25DbGljayJdLCJtYXBwaW5ncyI6IkFBQUEscUJBQTRCLFNBQVMsQ0FBQyxDQUFBO0FBRXRDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7SUFFbEIsSUFBSSxNQUFNLENBQUM7SUFDWCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWxDLFVBQVUsQ0FBQztRQUNULE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBRUgsU0FBUyxDQUFDO1FBQ1IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxnREFBZ0Q7SUFDaEQsRUFBRSxDQUFDLDBGQUEwRixFQUFFO1FBQzdGLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxQyxJQUFJLFFBQVEsR0FBRyxVQUFVLEtBQUs7WUFDNUIsU0FBUyxFQUFFLENBQUM7WUFDWixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJ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QUMsT0FBTyxHQUFHO2dCQUNmLEdBQUcsSUFBSSxHQUFHLENBQUM7WUFDYixDQUFDLENBQUM7WUFFRixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBR0gsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1lBQ25DLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNiLE1BQU0sQ0FBQyxPQUFPLEdBQUc7Z0JBQ2YsR0FBRyxJQUFJLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztZQUNGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBRXRCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNmLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpZkVudlN1cHBvcnRzfSBmcm9tICcuLi91dGlsJztcblxuZGVzY3JpYmUoJ2VsZW1lbnQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGJ1dHRvbjtcbiAgdmFyIHRlc3Rab25lID0gZ2xvYmFsLnpvbmUuZm9yaygpO1xuXG4gIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGJ1dHRvbik7XG4gIH0pO1xuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3pvbmUuanMvaXNzdWVzLzE5MFxuICBpdCgnc2hvdWxkIHdvcmsgd2hlbiBhZGRFdmVudExpc3RlbmVyIC8gcmVtb3ZlRXZlbnRMaXN0ZW5lciBhcmUgY2FsbGVkIGluIHRoZSBnbG9iYWwgY29udGV4dCcsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2xpY2tFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgIHZhciBjYWxsQ291bnQgPSAwO1xuXG4gICAgY2xpY2tFdmVudC5pbml0RXZlbnQoJ2NsaWNrJywgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGNhbGxDb3VudCsrO1xuICAgICAgZXhwZWN0KGdsb2JhbC56b25lKS50b0JlRGlyZWN0Q2hpbGRPZih0ZXN0Wm9uZSk7XG4gICAgICBleHBlY3QoZXZlbnQpLnRvQmUoY2xpY2tFdmVudClcbiAgICB9O1xuXG4gICAgdGVzdFpvbmUucnVuKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gYHRoaXNgIHdvdWxkIGJlIG51bGwgaW5zaWRlIHRoZSBtZXRob2Qgd2hlbiBgYWRkRXZlbnRMaXN0ZW5lcmAgaXMgY2FsbGVkIGZyb20gc3RyaWN0IG1vZGVcbiAgICAgIC8vIGl0IHdvdWxkIGJlIGB3aW5kb3dgOlxuICAgICAgLy8gLSB3aGVuIGNhbGxlZCBmcm9tIG5vbiBzdHJpY3QtbW9kZSxcbiAgICAgIC8vIC0gd2hlbiBgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJgIGlzIGNhbGxlZCBleHBsaWNpdGVseS5cbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGlzdGVuZXIpO1xuICAgIH0pO1xuXG4gICAgYnV0dG9uLmRpc3BhdGNoRXZlbnQoY2xpY2tFdmVudCk7XG4gICAgZXhwZWN0KGNhbGxDb3VudCkudG9FcXVhbCgxKTtcblxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGlzdGVuZXIpO1xuICAgIGJ1dHRvbi5kaXNwYXRjaEV2ZW50KGNsaWNrRXZlbnQpO1xuICAgIGV4cGVjdChjYWxsQ291bnQpLnRvRXF1YWwoMSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgd29yayB3aXRoIGFkZEV2ZW50TGlzdGVuZXIgd2hlbiBjYWxsZWQgd2l0aCBhIGZ1bmN0aW9uIGxpc3RlbmVyJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBjbGlja0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgY2xpY2tFdmVudC5pbml0RXZlbnQoJ2NsaWNrJywgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICB0ZXN0Wm9uZS5ydW4oZnVuY3Rpb24oKSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXhwZWN0KGdsb2JhbC56b25lKS50b0JlRGlyZWN0Q2hpbGRPZih0ZXN0Wm9uZSk7XG4gICAgICAgIGV4cGVjdChldmVudCkudG9CZShjbGlja0V2ZW50KVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBidXR0b24uZGlzcGF0Y2hFdmVudChjbGlja0V2ZW50KTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCB3b3JrIHdpdGggYWRkRXZlbnRMaXN0ZW5lciB3aGVuIGNhbGxlZCB3aXRoIGFuIEV2ZW50TGlzdGVuZXItaW1wbGVtZW50aW5nIGxpc3RlbmVyJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBldmVudExpc3RlbmVyID0ge1xuICAgICAgeDogNSxcbiAgICAgIGhhbmRsZUV2ZW50OiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBUZXN0IHRoYXQgY29udGV4dCBpcyBwcmVzZXJ2ZWRcbiAgICAgICAgZXhwZWN0KHRoaXMueCkudG9CZSg1KTtcblxuICAgICAgICBleHBlY3QoZXZlbnQpLnRvQmUoY2xpY2tFdmVudCk7XG4gICAgICAgIGV4cGVjdChnbG9iYWwuem9uZSkudG9CZURpcmVjdENoaWxkT2YodGVzdFpvbmUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgY2xpY2tFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgIGNsaWNrRXZlbnQuaW5pdEV2ZW50KCdjbGljaycsIHRydWUsIHRydWUpO1xuXG4gICAgdGVzdFpvbmUucnVuKGZ1bmN0aW9uKCkge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lcik7XG4gICAgfSk7XG5cbiAgICBidXR0b24uZGlzcGF0Y2hFdmVudChjbGlja0V2ZW50KTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXNwZWN0IHJlbW92ZUV2ZW50TGlzdGVuZXIgd2hlbiBjYWxsZWQgd2l0aCBhIGZ1bmN0aW9uIGxpc3RlbmVyJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBsb2cgPSAnJztcbiAgICB2YXIgbG9nRnVuY3Rpb24gPSBmdW5jdGlvbiBsb2dGdW5jdGlvbiAoKSB7XG4gICAgICBsb2cgKz0gJ2EnO1xuICAgIH07XG5cbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2dGdW5jdGlvbik7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgbG9nRnVuY3Rpb24pO1xuICAgIGJ1dHRvbi5jbGljaygpO1xuICAgIGV4cGVjdChsb2cpLnRvRXF1YWwoJ2EnKTtcbiAgICB2YXIgZm9jdXNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgIGZvY3VzRXZlbnQuaW5pdEV2ZW50KCdmb2N1cycsIHRydWUsIHRydWUpXG4gICAgYnV0dG9uLmRpc3BhdGNoRXZlbnQoZm9jdXNFdmVudCk7XG4gICAgZXhwZWN0KGxvZykudG9FcXVhbCgnYWEnKTtcblxuICAgIGJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGxvZ0Z1bmN0aW9uKTtcbiAgICBidXR0b24uY2xpY2soKTtcbiAgICBleHBlY3QobG9nKS50b0VxdWFsKCdhYScpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJlc3BlY3QgcmVtb3ZlRXZlbnRMaXN0ZW5lciB3aXRoIGFuIEV2ZW50TGlzdGVuZXItaW1wbGVtZW50aW5nIGxpc3RlbmVyJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBldmVudExpc3RlbmVyID0ge1xuICAgICAgeDogNSxcbiAgICAgIGhhbmRsZUV2ZW50OiBqYXNtaW5lLmNyZWF0ZVNweSgnaGFuZGxlRXZlbnQnKVxuICAgIH07XG5cbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudExpc3RlbmVyKTtcbiAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudExpc3RlbmVyKTtcblxuICAgIGJ1dHRvbi5jbGljaygpO1xuXG4gICAgZXhwZWN0KGV2ZW50TGlzdGVuZXIuaGFuZGxlRXZlbnQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgaGF2ZSBubyBlZmZlY3Qgd2hpbGUgY2FsbGluZyBhZGRFdmVudExpc3RlbmVyIHdpdGhvdXQgbGlzdGVuZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV2ZW50TGlzdGVuZXJab25lID0gZ2xvYmFsLnpvbmUuZm9yayh7XG4gICAgICBhZGRFdmVudExpc3RlbmVyOiBqYXNtaW5lLmNyZWF0ZVNweSgnYWRkRXZlbnRMaXN0ZW5lcicpXG4gICAgfSk7XG4gICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgZXZlbnRMaXN0ZW5lclpvbmUucnVuKGZ1bmN0aW9uKCkge1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBudWxsKTtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdW5kZWZpbmVkKTtcbiAgICAgIH0pO1xuICAgIH0pLm5vdC50b1Rocm93RXJyb3IoKTtcbiAgICBleHBlY3QoZXZlbnRMaXN0ZW5lclpvbmUuYWRkRXZlbnRMaXN0ZW5lcikudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2NsaWNrJywgbnVsbCk7XG4gICAgZXhwZWN0KGV2ZW50TGlzdGVuZXJab25lLmFkZEV2ZW50TGlzdGVuZXIpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdjbGljaycsIHVuZGVmaW5lZCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgaGF2ZSBubyBlZmZlY3Qgd2hpbGUgY2FsbGluZyByZW1vdmVFdmVudExpc3RlbmVyIHdpdGhvdXQgbGlzdGVuZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV2ZW50TGlzdGVuZXJab25lID0gZ2xvYmFsLnpvbmUuZm9yayh7XG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyOiBqYXNtaW5lLmNyZWF0ZVNweSgncmVtb3ZlRXZlbnRMaXN0ZW5lcicpXG4gICAgfSk7XG4gICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgZXZlbnRMaXN0ZW5lclpvbmUucnVuKGZ1bmN0aW9uKCkge1xuICAgICAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBudWxsKTtcbiAgICAgICAgYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdW5kZWZpbmVkKTtcbiAgICAgIH0pO1xuICAgIH0pLm5vdC50b1Rocm93RXJyb3IoKTtcbiAgICBleHBlY3QoZXZlbnRMaXN0ZW5lclpvbmUucmVtb3ZlRXZlbnRMaXN0ZW5lcikudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2NsaWNrJywgbnVsbCk7XG4gICAgZXhwZWN0KGV2ZW50TGlzdGVuZXJab25lLnJlbW92ZUV2ZW50TGlzdGVuZXIpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdjbGljaycsIHVuZGVmaW5lZCk7XG4gIH0pO1xuXG5cbiAgaXQoJ3Nob3VsZCBvbmx5IGFkZCBhIGxpc3RlbmVyIG9uY2UgZm9yIGEgZ2l2ZW4gc2V0IG9mIGFyZ3VtZW50cycsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBsb2cgPSBbXTtcbiAgICB2YXIgY2xpY2tFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuXG4gICAgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICBsb2cucHVzaCgnbGlzdGVuZXInKTtcbiAgICB9XG5cbiAgICBjbGlja0V2ZW50LmluaXRFdmVudCgnY2xpY2snLCB0cnVlLCB0cnVlKTtcblxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpc3RlbmVyKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsaXN0ZW5lcik7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGlzdGVuZXIpO1xuXG4gICAgYnV0dG9uLmRpc3BhdGNoRXZlbnQoY2xpY2tFdmVudCk7XG5cbiAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsaXN0ZW5lcik7XG5cbiAgICBidXR0b24uZGlzcGF0Y2hFdmVudChjbGlja0V2ZW50KTtcblxuICAgIGV4cGVjdChsb2cpLnRvRXF1YWwoW1xuICAgICAgICAnbGlzdGVuZXInXG4gICAgXSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgY29ycmVjdGx5IGhhbmRsZSBjYXB0dXJpbmcgdmVyc3VzIG5vbkNhcHR1cmluZyBldmVudExpc3RlbmVycycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbG9nID0gW107XG4gICAgdmFyIGNsaWNrRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcblxuICAgIGZ1bmN0aW9uIGNhcHR1cmluZ0xpc3RlbmVyICgpIHtcbiAgICAgIGxvZy5wdXNoKCdjYXB0dXJpbmdMaXN0ZW5lcicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1YmJsaW5nTGlzdGVuZXIgKCkge1xuICAgICAgbG9nLnB1c2goJ2J1YmJsaW5nTGlzdGVuZXInKTtcbiAgICB9XG5cbiAgICBjbGlja0V2ZW50LmluaXRFdmVudCgnY2xpY2snLCB0cnVlLCB0cnVlKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYXB0dXJpbmdMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJ1YmJsaW5nTGlzdGVuZXIpO1xuXG4gICAgYnV0dG9uLmRpc3BhdGNoRXZlbnQoY2xpY2tFdmVudCk7XG5cbiAgICBleHBlY3QobG9nKS50b0VxdWFsKFtcbiAgICAgICdjYXB0dXJpbmdMaXN0ZW5lcicsXG4gICAgICAnYnViYmxpbmdMaXN0ZW5lcidcbiAgICBdKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgaGFuZGxlIGEgbGlzdGVuZXIgdGhhdCBpcyBib3RoIGNhcHR1cmluZyBhbmQgbm9uQ2FwdHVyaW5nJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBsb2cgPSBbXTtcbiAgICB2YXIgY2xpY2tFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuXG4gICAgZnVuY3Rpb24gbGlzdGVuZXIgKCkge1xuICAgICAgbG9nLnB1c2goJ2xpc3RlbmVyJyk7XG4gICAgfVxuXG4gICAgY2xpY2tFdmVudC5pbml0RXZlbnQoJ2NsaWNrJywgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGlzdGVuZXIsIHRydWUpO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsaXN0ZW5lcik7XG5cbiAgICBidXR0b24uZGlzcGF0Y2hFdmVudChjbGlja0V2ZW50KTtcblxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGxpc3RlbmVyKTtcblxuICAgIGJ1dHRvbi5kaXNwYXRjaEV2ZW50KGNsaWNrRXZlbnQpO1xuXG4gICAgZXhwZWN0KGxvZykudG9FcXVhbChbXG4gICAgICAnbGlzdGVuZXInLFxuICAgICAgJ2xpc3RlbmVyJ1xuICAgIF0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnb25jbGljaycsIGZ1bmN0aW9uKCkge1xuXG4gICAgZnVuY3Rpb24gc3VwcG9ydHNPbkNsaWNrKCkge1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdmFyIGNsaWNrUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGRpdiwgJ29uY2xpY2snKTtcbiAgICAgIHJldHVybiAhKEV2ZW50VGFyZ2V0ICYmXG4gICAgICAgICAgICAgICBkaXYgaW5zdGFuY2VvZiBFdmVudFRhcmdldCAmJlxuICAgICAgICAgICAgICAgY2xpY2tQcm9wRGVzYyAmJiBjbGlja1Byb3BEZXNjLnZhbHVlID09PSBudWxsKTtcbiAgICB9XG4gICAgKDxhbnk+c3VwcG9ydHNPbkNsaWNrKS5tZXNzYWdlID0gJ1N1cHBvcnRzIEVsZW1lbnQjb25jbGljayBwYXRjaGluZyc7XG5cblxuICAgIGlmRW52U3VwcG9ydHMoc3VwcG9ydHNPbkNsaWNrLCBmdW5jdGlvbigpIHtcbiAgICAgIGl0KCdzaG91bGQgc3Bhd24gbmV3IGNoaWxkIHpvbmVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0ZXN0Wm9uZS5ydW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBleHBlY3QoZ2xvYmFsWyd6b25lQSddKS50b0JlRGlyZWN0Q2hpbGRPZih0ZXN0Wm9uZSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYnV0dG9uLmNsaWNrKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBvbmx5IGFsbG93IG9uZSBvbmNsaWNrIGhhbmRsZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgbG9nID0gJyc7XG4gICAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nICs9ICdhJztcbiAgICAgIH07XG4gICAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nICs9ICdiJztcbiAgICAgIH07XG5cbiAgICAgIGJ1dHRvbi5jbGljaygpO1xuICAgICAgZXhwZWN0KGxvZykudG9FcXVhbCgnYicpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnc2hvdWxkIGhhbmRsZSByZW1vdmluZyBvbmNsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGxvZyA9ICcnO1xuICAgICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZyArPSAnYSc7XG4gICAgICB9O1xuICAgICAgYnV0dG9uLm9uY2xpY2sgPSBudWxsO1xuXG4gICAgICBidXR0b24uY2xpY2soKTtcbiAgICAgIGV4cGVjdChsb2cpLnRvRXF1YWwoJycpO1xuICAgIH0pO1xuICB9KTtcblxufSk7XG4iXX0=