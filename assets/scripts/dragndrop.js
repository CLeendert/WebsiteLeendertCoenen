let container = document.querySelector(".container");

function moveCard(event, card) {
	let wrapper = card.parentNode;

	let cardX = event.clientX + container.scrollLeft;
	let cardY = event.clientY;
	let offsetX = card.offsetLeft;

	document.onmousemove = drag;
	document.onmouseup = drop;

	function drag(event) {
		let movingX = event.clientX - cardX;
		let movingY = event.clientY - cardY;

		if (reachingRightEdge(movingX, offsetX)) {
			scrollLeft(5);
		}

		if (reachingLeftEdge(movingX, offsetX)) {
			scrollLeft(-5);
		}

		card.style.transform =
			"translate3d(" + movingX + "px, " + movingY + "px, 0px) rotate(5deg)";
		card.classList.add("card--is-moving");
		placeholder.display(wrapper);
	}

	function drop(event) {
		card.style = null;
		document.onmousemove = null;
		document.onmouseup = null;
		card.classList.remove("card--is-moving");

		placeholder.hide(wrapper);
		dropzone.grabElement(event.pageX, event.pageY);
		dropzone.stack(wrapper);
	}
}

const dropzone = {
	holder: null,
	grabElement(pageX, pageY, target = ".dropzone") {
		const element = document.elementFromPoint(pageX, pageY);
		this.holder = element.closest(target);
	},
	stack(card) {
		if (this.holder === null) return;

		this.holder.appendChild(card);
	}
};

const placeholder = {
	placeholder: document.createElement("div"),
	display(card) {
		this.placeholder.classList.add("placeholder");
		card.append(this.placeholder);
		this.placeholder.style.display = "block";
	},
	hide(card) {
		card.removeChild(this.placeholder);
	}
};

const reachingRightEdge = (movingX, offsetX) => {
	const draggingX = movingX + offsetX + 225;
	const viewportWidth = Math.max(
		document.documentElement.clientWidth || 0,
		window.innerWidth || 0
	);

	if (draggingX >= viewportWidth) {
		return true;
	}

	return false;
};

const reachingLeftEdge = (movingX, offsetX) => {
	const draggingX = movingX + offsetX;
	const viewportWidth = Math.max(
		document.documentElement.clientWidth || 0,
		window.innerWidth || 0
	);

	if (draggingX < 10) {
		return true;
	}

	return false;
};

const scrollLeft = (value) => {
	container.scroll({
		left: (container.scrollLeft += value),
		behavior: "smooth"
	});
};
