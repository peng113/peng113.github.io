function getLevel(n){
    if(n >= 80){ return "A"; }
    else if(n >= 60){return "B";}
    else if(n >= 40){return "C";}
    else if(n >= 20){return "D";}
    else{return "E";}
}

r(()=>{showLoad(); fetch("../w02_data_to_st.csv").then(res => {return res.text();}).then(str => {
    
    let level = {A:0, B:0, C:0, D:0, E:0};
    let total = 0;
    let level_area = {};

    const tmp = str.replaceAll("\r", "").split("\n"); tmp.shift();
    let csv = [];
    for (let i = 0; i < tmp.length; i++) {
        const t = tmp[i];
        if(t == ""){continue;}
        let a = t.split(",");
        if(a.length != 3){continue;}
        a[1] = parseFloat(a[1]);
        if(isNaN(a[1])){continue;}
        let m = a[2];
        const L = getLevel(a[1]);
        if(level_area[m] == undefined){
            level_area[m] = {A:0, B:0, C:0, D:0, E:0};
        }
        level[L]++;
        level_area[m][L]++
        
        total += a[1];
        
        csv.push(a);
    };
    
    let min = Infinity, max = 0;

    let tab_b = "";
    let tbody="";
    const avg = (total / csv.length);
    const avgL = getLevel(avg);
    document.querySelector("#avgL").innerText = `所有人之平均等級：${avgL}`;
    let all_str = "";
    let all_tr = `<th scope="row">總體</th>`;
    ["A", "B", "C", "D", "E"].forEach((k)=>{
        all_str += `<td>${level[k]}</td>`;
        const p = level[k]/csv.length;
        if(p < min){min = p;}
        if(p > max){max = p;}
        all_tr += `<td style='--x:${p}; --size:calc(var(--a) * var(--x) + var(--b));'><span class="data text-nowrap font-monospace">${level[k]}</span></td>`
    })
    tab_b += `<tr><td>總體</td>${all_str}</tr>`;
    tbody += `<tr>${all_tr}</tr>`;

    Object.keys(level_area).forEach((k)=>{
        let tmp = "";
        let tr = `<th scope="row">地區 ${k}</th>`;
        ["A", "B", "C", "D", "E"].forEach((kk)=>{
            tmp+= `<td>${level_area[k][kk]}</td>`;
            const p = level_area[k][kk]/csv.length;
            if(p < min){min = p;}
            if(p > max){max = p;}
            tr += `<td style='--x:${p}; --size:calc(var(--a) * var(--x) + var(--b));'><span class="data text-nowrap font-monospace">${level_area[k][kk]}</span></td>`
        })
        tab_b += `<tr><td>地區 ${k}</td>${tmp}</tr>`;
        tbody += `<tr>${tr}</tr>`;
    })
    document.querySelector("#tab > tbody").innerHTML = tab_b;
    
    const a = (1-0.1-0.1) / (max - min);
    const b = -min * a + 0.1;
    document.querySelector("#my-chart table > tbody").style.setProperty('--a', a);
    document.querySelector("#my-chart table > tbody").style.setProperty('--b', b);
    document.querySelector("#my-chart table > tbody").innerHTML = tbody;

    hideLoad();
});})