const mask = (selector) => {

    let setCursorPosition = (pos, elem) => {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        } else {
			if (elem[0].setSelectionRange) {
				pos = elem[0].selectionStart;
				pos = elem[0].selectionEnd;
			} else if (document.selection && document.selection.createRange) {
				let range = document.selection.createRange();
				pos = 0 - range.duplicate().moveStart('character', -100000);
				pos = pos + range.text.length;
			}return { pos: pos, pos: pos };
		}
        
    };

        function createMask (event) {
            let matrix = '+38 (___) ___ __ __',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');

            if (def.length >= val.length) {
                val = def;
            }

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });

            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }

        let inputs = document.querySelectorAll(selector);

        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
};


export default mask;