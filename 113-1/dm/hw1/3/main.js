let all_avg = 0;

function getN(n){
    const a = all_avg + n;
    if(a > 100){return 100;}
    if(a < 0){return 0;}
    return a;
}

function getLevel(n){
    if(n >= getN(26)){ return "A"; }
    else if(n >= getN(6)){return "B";}
    else if(n >= getN(-5)){return "C";}
    else if(n >= getN(-23)){return "D";}
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
        
        total += a[1];
        
        csv.push(a);
    };
    all_avg = (total / csv.length);
    console.log(all_avg);

    document.querySelector("#table_label").innerHTML = 
        `<li> A (100 ~ ${roundTo(getN(26), 2).toFixed(2)}) </li>`+
        `<li> B (${roundTo(getN(25), 2).toFixed(2)} ~ ${roundTo(getN(6), 2).toFixed(2)}) </li>`+
        `<li> C (${roundTo(getN(5), 2).toFixed(2)} ~ ${roundTo(getN(-5), 2).toFixed(2)}) </li>`+
        `<li> D (${roundTo(getN(-4), 2).toFixed(2)} ~ ${roundTo(getN(-23), 2).toFixed(2)}) </li>`+
        `<li> E (${roundTo(getN(-24), 2).toFixed(2)} ~ 0) </li>`;

    csv.forEach((a)=>{
        let m = a[2];
        const L = getLevel(a[1]);
        if(level_area[m] == undefined){
            level_area[m] = {A:0, B:0, C:0, D:0, E:0};
        }
        level[L]++;
        level_area[m][L]++
    })

    let min = Infinity, max = 0;

    let tab_b = "";
    let tbody="";
    const avgL = getLevel(all_avg);
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
    
    const p = 0.1;
    const a = (1-p-p) / (max - min);
    const b = -min * a + p;
    document.querySelector("#my-chart table > tbody").style.setProperty('--a', a);
    document.querySelector("#my-chart table > tbody").style.setProperty('--b', b);
    document.querySelector("#my-chart table > tbody").innerHTML = tbody;

    hideLoad();
});})