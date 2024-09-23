r(()=>{showLoad(); fetch("../w02_data_to_st.csv").then(res => {return res.text();}).then(str => {
    let area_str="", tbody="";
    let total = 0;
    let total_area = {};
    
    const tmp = str.replaceAll("\r", "").split("\n"); tmp.shift();
    let csv = [];
    for (let i = 0; i < tmp.length; i++) {
        const t = tmp[i];
        if(t == ""){continue;}
        let a = t.split(",");
        if(a.length != 3){continue;}
        let m = a[2];
        if(total_area[m] == undefined){
            total_area[m] = {t:0, c:0};
        }
        a[1] = parseFloat(a[1]);
        if(isNaN(a[1])){continue;}
        
        total += a[1];
        total_area[m].t += a[1];
        total_area[m].c ++;
        csv.push(a);
    };
    
    const avg = (total / csv.length);
    document.querySelector("#avg").innerText = roundTo(avg, 2).toFixed(2);
    tbody += `<tr><th scope="row">總體平均</th><td style='--size:${avg/100};'><span class="data font-monospace"> ${roundTo(avg, 2).toFixed(2)} </span></td></tr>`;
    let min = Infinity, max = 0;
    Object.keys(total_area).forEach((k)=>{
        const avg = total_area[k].t / total_area[k].c;
        total_area[k].avg = avg;
        let p = avg/100;
        if(p < min){min = p;}
        if(p > max){max = p;}
        area_str += `<div>地區 ${k} 平均：<span>${roundTo(avg, 2).toFixed(2)}</span></div>`;
        tbody += `<tr><th scope="row">地區 ${k}</th><td style='--x:${p}; --size:calc(var(--a) * var(--x) + var(--b));'><span class="data font-monospace"> ${roundTo(avg, 2).toFixed(2)} </span></td></tr>`;
    })
    document.querySelector("#area").innerHTML = area_str;

    const a = (1-0.1-0.1) / (max - min);
    const b = -min * a + 0.1;
    document.querySelector("#my-chart > table > tbody").style.setProperty('--a', a);
    document.querySelector("#my-chart > table > tbody").style.setProperty('--b', b);
    document.querySelector("#my-chart > table > tbody").innerHTML = tbody;
    
    hideLoad();
});})