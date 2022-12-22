import React from "react"
const Xcircle = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZjAwMDBiZCIgY2xhc3M9ImJpIGJpLXgtY2lyY2xlLWZpbGwiIHZpZXdCb3g9IjAgMCAxNiAxNiI+DQogIDxwYXRoIGQ9Ik0xNiA4QTggOCAwIDEgMSAwIDhhOCA4IDAgMCAxIDE2IDB6TTUuMzU0IDQuNjQ2YS41LjUgMCAxIDAtLjcwOC43MDhMNy4yOTMgOGwtMi42NDcgMi42NDZhLjUuNSAwIDAgMCAuNzA4LjcwOEw4IDguNzA3bDIuNjQ2IDIuNjQ3YS41LjUgMCAwIDAgLjcwOC0uNzA4TDguNzA3IDhsMi42NDctMi42NDZhLjUuNSAwIDAgMC0uNzA4LS43MDhMOCA3LjI5MyA1LjM1NCA0LjY0NnoiLz4NCjwvc3ZnPg=="
const Checkcircle = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDgwMDBiZCIgY2xhc3M9ImJpIGJpLWNoZWNrLWNpcmNsZS1maWxsIiB2aWV3Qm94PSIwIDAgMTYgMTYiPg0KICA8cGF0aCBkPSJNMTYgOEE4IDggMCAxIDEgMCA4YTggOCAwIDAgMSAxNiAwem0tMy45Ny0zLjAzYS43NS43NSAwIDAgMC0xLjA4LjAyMkw3LjQ3NyA5LjQxNyA1LjM4NCA3LjMyM2EuNzUuNzUgMCAwIDAtMS4wNiAxLjA2TDYuOTcgMTEuMDNhLjc1Ljc1IDAgMCAwIDEuMDc5LS4wMmwzLjk5Mi00Ljk5YS43NS43NSAwIDAgMC0uMDEtMS4wNXoiLz4NCjwvc3ZnPg=="
const Ximg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAEkSURBVDiNlZM9L0RBFIafiI9sQSESGgp+ABGtlvAHhCg1mi39B1Q0eoVohJAoRSSS7UgUEoVEIqHR+I7IPoq9Nzt37t0rW5xi5j3vM2fmzEGYFm6EM6Gq0k4g7Agm8SVslJpgSOgMAX3CRQBR2Cow9grnwq/wLFwK86k4LHxGkJXIfB3pCpvhCcuR+C30JFot0p6EycYVsmXuRYnbwkm09yiMNN8gC6gIDwWlpvEijGa7kH+siSQxNn+kZZcDGpDjyFwX5or/Qd5cLTi9LhxJPj82zxR0IlwftAbAmPAeJN8Kg8KS8BPs77YChO06FfoDbVy4CvR9oasJgIXknq/CVMkcrAr3CaQmVBC6hTvhTVj8dwKhQ5gV1oSB9J8fCuvtjrLKH5VoRtGrBkTqAAAAAElFTkSuQmCC"
const Checkimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAE0SURBVCiRnZC9SgNBFEbPJIsLuyAWK4hF0liYEBZS+w4iWgUs7axSTz11nkKsxMJXsBQCWwQUBEEEIZsi4C4ObLgWGUN+TGLyNVPcOYd7PyUibBNlelfs+y21jUDp5J7AqwHHGwlUuwuRPwR2yQslJubfAqUTiPxvwCe1SkwMQGkDeODg1i8MrN/AwRbYIbUPYuLTmfkqgYOF0IO+fRddr8z/8ZROAuCJfHQmnebLBG53oRJ8EXqQFUNSuwADlKiGGdWwRiV4Vjo5nEwi/5HQC8kKSO2edJp/bunRt7cE5RahB/ChTE8B1wTlEwer6dIWzhQRlE6qRP6bk3wCBw6+FBPfLKWZKlHp5I7IP3cS6NtX0fWjVfC4Axcx8QX5aABAVhSkdi08IwAgLxrjd9RYVtp8fgDVnYH+mBjqvAAAAABJRU5ErkJggg=="

// const parseIcons = {
//     "No Cubre": <i className="fa fa-times" style={{ color: "#ff0000bd" }} aria-hidden="true"></i>,
//     "NO": <i className="fa fa-times" style={{ color: "#ff0000bd" }} aria-hidden="true"></i>,
//     "NO APLICA": <i className="fa fa-times" style={{ color: "#ff0000bd" }} aria-hidden="true"></i>,
//     "SI": <i className="fa fa-check" style={{ color: "#008000bd" }} aria-hidden="true"></i>,
//     "Si Cubre": <i className="fa fa-check" style={{ color: "#008000bd" }} aria-hidden="true"></i>,
//     "SI AMPARA": <i className="fa fa-check" style={{ color: "#008000bd" }} aria-hidden="true"></i>,
// }

const parseIcons = {
    "No Cubre": <img className="img-icon-table" src={Ximg}></img>,
    "NO": <img className="img-icon-table" src={Ximg}></img>,
    "NO APLICA": <img className="img-icon-table" src={Ximg}></img>,
    "SI": <img className="img-icon-table" src={Checkimg}></img>,
    "Si Cubre": <img className="img-icon-table" src={Checkimg}></img>,
    "SI AMPARA": <img className="img-icon-table" src={Checkimg}></img>,
}

const parseIconsPdf = {
    "No Cubre": <img className="img-icon-pdf" src={Ximg}></img>,
    "NO": <img className="img-icon-pdf" src={Ximg}></img>,
    "NO APLICA": <img className="img-icon-pdf" src={Ximg}></img>,
    "SI": <img className="img-icon-pdf" src={Checkimg}></img>,
    "Si Cubre": <img className="img-icon-pdf" src={Checkimg}></img>,
    "SI AMPARA": <img className="img-icon-pdf" src={Checkimg}></img>,
}


const parseIconsHorizontalCards = {
    "No Cubre": <i className="fa fa-times-circle" style={{ color: "#ff0000bd", marginRight: 5 }}></i>,
    "NO": <i className="fa fa-times-circle" style={{ color: "#ff0000bd", marginRight: 5 }}></i>,
    "NO APLICA": <i className="fa fa-times-circle" style={{ color: "#ff0000bd", marginRight: 5 }}></i>,
    "SI": <i className="fa fa-check-circle" style={{ color: "#008000bd", marginRight: 5 }}></i>,
    "Si Cubre": <i className="fa fa-check-circle" style={{ color: "#008000bd", marginRight: 5 }}></i>,
    "SI AMPARA": <i className="fa fa-check-circle" style={{ color: "#008000bd", marginRight: 5 }}></i>,
}

const parseIconsHorizontalCardsPdf = {
    "No Cubre": <img src={Xcircle} style={{ color: "#ff0000bd", marginRight: 5 }}/>,
    "NO": <img src={Xcircle} style={{ color: "#ff0000bd", marginRight: 5 }}/>,
    "NO APLICA": <img src={Xcircle} style={{ color: "#ff0000bd", marginRight: 5 }}/>,
    "SI": <img src={Checkcircle} style={{ color: "#ff0000bd", marginRight: 5 }}/>,
    "Si Cubre": <img src={Checkcircle} style={{ color: "#ff0000bd", marginRight: 5 }}/>,
    "SI AMPARA": <img src={Checkcircle} style={{ color: "#ff0000bd", marginRight: 5 }}/>,
}



const getIcon = (value="NO")=> {
    const icon = parseIconsHorizontalCards [value];
    if (icon){
        return icon;
    }
    return  <i className="fa fa-check-circle" style={{ color: "#008000bd", marginRight: 5 }}></i>;

}


const getIconPdf = (value="NO")=> {
    const icon = parseIconsHorizontalCardsPdf [value];
    if (icon){
        return icon;
    }
    return  <img src={Checkcircle} style={{ color: "#ff0000bd", marginRight: 5 }}/>;

}

export { parseIcons,getIcon, getIconPdf, parseIconsPdf };

