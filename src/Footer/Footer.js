import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <div className="ul">
                <a href="https://www.facebook.com/guy.leifer" target="_blank">
                    <div className="li">
                        <img className="Icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Facebook_icon_%28black%29.svg/1024px-Facebook_icon_%28black%29.svg.png" alter="Facebook" height="50px" width="50px"/>
                    </div>
                </a>
                <a href="https://github.com/GuyLeifer" target="_blank">
                    <div className="li">
                    <img className="Icon" src="https://icons-for-free.com/iconfiles/png/512/part+1+github-1320568339880199515.png" alter="Github" height="50px" width="50px"/>
                        <div className="name">
                        © Guy Leifer
                        </div>
                    </div>
                </a>
                <a href="https://www.linkedin.com/in/guy-leifer-a7036a1b6/" target="_blank">
                    <div className="li">
                        <img className="Icon" src="https://www.vectorico.com/wp-content/uploads/2018/02/LinkedIn-Icon-Squircle-Dark.png" alter="LinkedIn" height="50px" width="50px"/>
                    </div>
                </a>
            </div>
        </footer>
    )
}

export default Footer