export const gridscale_ = {
  get: () => {
    let scale = Number(localStorage.getItem('grid-scale'));
    if (scale) return Number(scale);
    scale = document.body.clientWidth / 5;
    localStorage.setItem('grid-scale', +scale + '');
    return scale;
  },
  set: (scale) => {
    localStorage.setItem('grid-scale', scale);
  },
};
