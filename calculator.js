var pre;
pre="NULL";
function display(val){
    document.getElementById("answer").value+=val;
}
function clc(){
    document.getElementById("answer").value="";
}
function dele(){
    var s=document.getElementById("answer").value;
    var new_s=s.substring(0,s.length-1);
    document.getElementById("answer").value=new_s;
}
function prec(c){
    if(c=='^'){
        return 3;
    }
    else if(c=='*'||c=='/'){
        return 2;
    }
    else if(c=='+'||c=='-'){
        return 1;
    }
    else{
        return -1;
    }
}
function solve(){
    let s=document.getElementById("answer").value;
    let i;
    // convertion into postfix to solve sum according to BDMAS
    var stack=[];
    stack.push('N');
    let temp;
    temp="";
    for(i=0;i<s.length;i++){
        if((s[i]>='0'&&s[i]<='9')||s[i]=='.'){
            if(i>0){
                if((s[i-1]>='0'&&s[i-1]<='9')||s[i-1]=='.'){
                    temp+=s[i];
                }
                else{
                    temp=temp+' '+s[i];
                }
            }
            else{
                temp+=s[i];
            }
        }
        else if(s[i]=='('){
            stack.push(s[i]);
        }
        else if(s[i]==')'){
            while(stack[stack.length-1]!='N'&&stack[stack.length-1]!='('){
                temp=temp+' '+stack[stack.length-1];
                stack.pop();
            }
            if(stack[stack.length-1]=='('){
                stack.pop();
            }
        }
        else{
            while(stack[stack.length-1]!='N'&&prec(s[i])<=prec(stack[stack.length-1])){
                temp=temp+' '+stack[stack.length-1]+' ';
                stack.pop();
            }
            stack.push(s[i]);
        }
    }
    while(stack[stack.length-1]!='N'){
        temp=temp+' '+stack[stack.length-1];
        stack.pop();
    }
    stack.pop();
    //document.write(temp);
    //solving the postfix expression
    for(i=0;i<temp.length;i++){
        if(temp[i]==' '){
            continue;
        }
        if(isNaN(temp[i])){
            let n1;
            n1=parseFloat(stack[stack.length-1]);
            stack.pop();
            let n2;
            n2=parseFloat(stack[stack.length-1]);
            stack.pop();
           // document.write(temp[i]);
            if(temp[i]=='+'){
                stack.push(String((n1)+(n2)));
            }
            else if(temp[i]=='*'){
                stack.push(String((n1)*(n2)));
            }
            else if(temp[i]=='/'){
                stack.push(String((n2)/(n1)));
            }
            else if(temp[i]=='-'){
                stack.push(String((n2)-(n1)));
            }
            else if(temp[i]=='^'){
                stack.push(String(Math.pow((n2),(n1))));
            }
        }
        else{
            let n;
            n=0;
            let dup;
            dup="";
            while(temp[i]!=' '){
                dup+=temp[i];
                i++;
            }
            if(dup[dup.length-1]=='-'){
                let dup1;
                dup1='-';
                dup1=dup1+dup.substring(0,dup.length-1);
                dup=dup1;
            }
            n=parseFloat(dup);
            i--;
            stack.push(String(n));
        }
    }
    pre=stack[stack.length-1];
    if(isNaN(pre)){
        pre=eval(s);
    }
    document.getElementById("answer").value=pre;
}
function prev(){
    document.getElementById("answer").value=pre;
    return;
}