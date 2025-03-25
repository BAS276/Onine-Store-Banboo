import "./navbar.css";
import { Link } from 'react-router-dom';
import React, { useRef } from 'react';
import logo from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/Slidermg/banboo-logo.png"

const Navbar = () => {
    const menuListRef = useRef(null);
    const toggleMenu = () => {
        if (menuListRef.current.style.maxHeight === "0px" || !menuListRef.current.style.maxHeight) {
            menuListRef.current.style.maxHeight = "300px";
        } else {
            menuListRef.current.style.maxHeight = "0px";
        }
    };

    return (
        <>
            <nav className="nav">
                
                <div className="menu-icon" onClick={toggleMenu}>
                    <img alt="img" className="iconlist" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAQhJREFUaEPtmcENwkAMBJ0CaMt1UZfLogEQX+6CjJRbC9/kGYWsd8cYJxy22XFs5tcw3J04hCHcLAFauhnQwQ6EIdwsAVq6GVCGVrql3f35GVdEDJ9394eZ3dSdMqtlVgOGz8hA2MxoaTNr8x1WD6FVeumhtaoA9X0xrE5crQdhdeJqPQh/2bTuk116OOfuwzkFxYhI6aYJ/7BaDg8ZIsMpL6mL3gVj+HyXhvC/tvReQ0tBSaGRHlqKYhQaGFakXKkB4cr0FdoQvuA1LZuWolUr/3mAMIQXJHB5Sy+oseSW/CyVxC4UhbAw7BIpCJfELhSFsDDsEikIl8QuFIWwMOwSKQiXxC4UfQEg5oA9fXn/VwAAAABJRU5ErkJggg==" />
                </div>
                <div className="logo">
                    <Link className="link" to="/"><img alt="img" className="imglogo" src={logo} /></Link>
                </div>

                <ul id="menuList" ref={menuListRef}>
                    <Link className="link" to="/" onClick={toggleMenu}><li className="li">Home</li></Link>
                    <Link className="link" to="/fullcategory" onClick={toggleMenu}><li className="li">category</li></Link>
                    <Link className="link" to="/Help" onClick={toggleMenu}><li className="li">Help</li></Link>
                </ul>
                <div className="icons">

                    <Link className="link" to="/Search">
                        <img alt="img" src="data:image/png;base64,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" />
                    </Link>
                    <Link className="link" to="/login">
                        <   img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABZBJREFUaEPFWl1y2zgMBk+yzkm6OUXgp9YnaXKSuE+hT5H0JHFP4gYUJZEUAIIUvauZjGYiCMCHf4F2YL0cANxsxA2kK8Oul2R9JHb0/+UaLNNmHQDQlDPaWJWV8s8Am8H/X5YJCsrCLYYTAZvdY7ZSK0cHDm5LFlnAWCSMBRwlbpRjtA3/MkeKmbCCmYz4H1yIeACA7wDwLwAcANwB4HaNoun+AQC/vfd0v2tNuSvgCPQnAPww2vXsAF7evJ+NYXzNTmYA3BBOCSkiEsjXhrdnra/g4Ozf/EuXtysCt4A7NCzti4ivk1fzwqMG61bus/c5aLsf9f48gs/CAxEphJ/3Mw0WyEHvdoaxaFnlICIVpXcBLOXleS5OMb+pmNEfGYnu05ULPHnv6b0hVxLSVlic3Cl0nxA/M8VX0g/v/aOkcVLFk8hY9Ll67x+GoI22HMJrLlIMs2d/8S/lBMGZV0mHzMu8a2wO6xstGVTIe1f1LFPsKKyp4FFqpNcwLxvaUiUAomG/vMPN+Y/lMFELpxjen8zM/OAb+rM07e0HDAAUzg7gtUT81Va6+M/RUii9GK9tLM1NbFKolh1C/p6996eaR7nniEiVvgzrk7/4c/VrImXIKG4CvFGqYCQUm+7BYeLnnouNQze/0gZMuuSIJA/P/xc83FSwUqXwiK9w28zfQ/rxKA8nA4fUP2uJsUIWKv4+wFF8BpgvBnVFEY/0uUdDRzko9VRpaVrLq3RdrW21uk3BbLsqAoRC09w/BT5iAVTV0ouW8DTrNTL7TR6vpNVik9QC6cNjXzgnLrV7uBIHcWAIUxLT9KmdvEiDwxHxcOMnLJJqjpI0JbVCawtpA5UyTwfFha+lb18P40cDq2ZRB+Qos6T1MA/P9hj3PRw4yulgQcc4KQHcyoGn5z/1DOGxJeme1DRpoodTOK2mIIGZpy0Mcppqoesy4cjvYWEmntez1pUPrWmpIvNbS6Yamg+8khlBO73oNWQ2gsQwp4GCdtPzWmfZSzuAjxvALwJqCYZ+pYw7rTYBln7exnEktV6lLeaONBbSkYpzvLTeO89PO9qSOnXNYUv3fxqA/gm0Dq5fX0s0cAw4gcj1bAQsh2vSjujEYV25Lmi7YmA+d6L8zs6dtka0Lf1NbSlanS2I6UjZ4EnllFfkQuCpgleA61psAZsd4QDxKR6ptECtK1Q59Z8GknRwllgKAcmSa7hFr5qNtbsTkrdpxm7O8cYcDhOUdpySGm/Ovxal5tyne7nEK6tBV4hngGsOWnfGap5RyGVHnT0BnwwrtNCjjQrHptnTrgZyCT4HgE/s+pQUCZ9+I4CWqPCIB7gFb1O9YEG3nD0lHmYmiMQaeMT3KLgUegVwjxf/dp18UDdhzkBqJylVKJAU5rSvZlpeMPbJItkU0pu8XTlf/cU/WH+w1hPaqf0qLTBbFGhTF6NHTi4s1ui9/PijC1FbTBBoB/DJZHS2B9cBK0/xCWlH9c4IOF28P4/4pZzFTqmKyiqpuhautqX19xqZWsGalpzhwVjeZGpKZKaE9rI4aAzpVc3uUwALJotrN4VwYizMA/mGs3nSmloRF7VNZ7UZLtUQditxM0F8ew1rHfC2PWytGDjIh2R2fe02UEqqUEzVPFZzePS5b6c9xMCn+uIAfhQhqJ5SNAIOKu9bn3ai5l4rd+CRRt14CoCXwrCe9awS77ZCbevIxSp4jYMewNPbppP9gR6TizYvZKCHF8A0tNPZT7yC4M3PfPPH5l6zmzAW1US/wJLXL2nr99HX4nkLTXXwrdktF5LksNC0ds6OnZhqKCrP5SlNrdJis+xE0flaG3hJSBbSrZps6FsZtGFop5b1sXtYlToK8Cg+er235UO7mYs37gMm5WqRIHrY8rLZBruZWRhUaOLjv2Q0fV7F6r5lAAAAAElFTkSuQmCC" />
                    </Link>
                    <Link className="link" to="/Cart">
                        <img src="data:image/png;base64,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" />
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
