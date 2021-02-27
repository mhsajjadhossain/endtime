let reqe = sel => {
    return document.querySelector(sel);
}
let reqeAll = sel => {
    return document.querySelectorAll(sel);
}
let celm = (n,cnm)=>{
    let elm = document.createElement(n);
    elm.classList.add(cnm);
    return elm;
}
let start = (sel) => {
    let selector = reqe(sel);
    let time = selector.getAttribute('data-date');
    let mode = selector.getAttribute('data-to');
    let showNames = Boolean(selector.getAttribute('data-name'));
    let colon = (selector.getAttribute('data-divide')) ? (selector.getAttribute('data-divide')) : ':';
    let wraper = celm('span','clockWrap');
    // creating the timewrappers name
    let dNames = celm('span','names'); 
    let hNames = celm('span','names'); 
    let mNames = celm('span','names'); 
    let sNames = celm('span','names');
    dNames.innerHTML = 'Days';
    hNames.innerHTML = 'Hours';
    mNames.innerHTML = 'Minutes';
    sNames.innerHTML = 'Seconds';
    // create time wrapper
    let dWrap = celm('span','day');
    let hWrap = celm('span','hour');
    let mWrap = celm('span','minute');
    let sWrap = celm('span','second')
    // create time wrapper inner
    let dInner = celm('span','d')
    let hInner = celm('span','h')
    let mInner = celm('span','m')
    let sInner = celm('span','s')
    // appending timewrapper inner to the time wrapper
    dWrap.appendChild(dInner)
    hWrap.appendChild(hInner)
    mWrap.appendChild(mInner)
    sWrap.appendChild(sInner)
    // appending names to the clock wrpper    
    if(showNames){
        dWrap.appendChild(dNames)
        hWrap.appendChild(hNames)
        mWrap.appendChild(mNames)
        sWrap.appendChild(sNames)
    }
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
    let countDown = new Date(time).getTime();
    console.log('time :', time);
        if(mode === 'hour'){
            wraper.appendChild(hWrap)
            wraper.appendChild(mWrap)
            wraper.appendChild(sWrap)
        }else if(mode === 'day'){
            wraper.appendChild(dWrap)
            wraper.appendChild(hWrap)
            wraper.appendChild(mWrap)
            wraper.appendChild(sWrap)
        }
    let clock=()=>{
        let now = new Date().getTime(),
            distance = countDown - now;
            let d = Math.floor(distance / (day)),
                h = (mode === 'hour') ? Math.floor((distance / hour)) : Math.floor((distance % (day)) / (hour)),
                m = Math.floor((distance % (hour)) / (minute)),
                s = Math.floor((distance % (minute)) / (second))
                // cincading 0 with the values
                d = ((d + '').length == 1)?`0${d}`:d;
                h = ((h + '').length == 1)?`0${h}`:h;
                m = ((m + '').length == 1)?`0${m}`:m;
                s = ((s + '').length == 1)?`0${s}`:s;
                // formating the outputs and adding colon
                dInner.innerHTML = d+colon;         
                hInner.innerHTML = h+colon;
                mInner.innerHTML = m+colon;
                sInner.innerHTML = s;
                selector.appendChild(wraper);
    }
    // let x = setInterval(clock, 1000)
    clock()
}
let endhoure=(sel)=>{
    let sselector = reqe(sel);
    if(!sselector)return;
    let isRestart = Boolean(sselector.getAttribute('data-restart'))
    let timeIncrease = sselector.getAttribute('data-plus');
    let endsOn = sselector.getAttribute('data-date');
    let startOn = sselector.getAttribute('data-start');
    let started = (new Date(startOn).getTime() - new Date().getTime()) < 0 && (new Date(endsOn).getTime() - new Date().getTime()) > 0;
    if(started){
        start(sel)
    }else{
        if(isRestart && timeIncrease != ''){
            sselector.setAttribute('data-date',timeIncrease)
            start(sel)
        }
        return sselector.style.display="none";
    }
}
