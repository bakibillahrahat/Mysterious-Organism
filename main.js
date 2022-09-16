// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
}
  
// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
}
  
const pAequorFactory = (specimenNum, dna) => {
    return {
        specimenNum,
        dna,
        mutate(){
            const randomIndex = Math.floor(Math.random() * this.dna.length);
            let currentBase = returnRandBase();
            while(this.dna[randomIndex] === currentBase){
                currentBase = returnRandBase();
            }
            this.dna[randomIndex] = currentBase;
            return this.dna;
        },
        compareDNA(anotherObj){
            const similarities = this.dna.reduce((prev, curr, idx, arr) => {
                if(arr[idx] === anotherObj.dna[idx]){
                    return prev + 1;
                }else{
                    return prev;
                }
            },0)
            const similarParcent = (similarities / this.dna.length) * 100;
            const dec2SimilarParcent = similarParcent.toFixed(2);
            console.log(`${this.specimenNum} and ${
                anotherObj.specimenNum} have ${dec2SimilarParcent}% DNA in common`)
        },
        willLikelySurvive(){
            const cOrG = this.dna.filter(el => el === "C" || el === "G");
            return cOrG.length / this.dna.length >= 0.06
        },
    }
}

const survivalSpecimen = [];
let id = 1;

while(survivalSpecimen.length < 30){
    let newOrganism = pAequorFactory(id, mockUpStrand());
    if(newOrganism.willLikelySurvive()){
        survivalSpecimen.push(newOrganism);
    }
    id++;
}
console.log(survivalSpecimen);
// const pAequor = pAequorFactory(1, mockUpStrand());
// const pAequor2 = pAequorFactory(2, mockUpStrand()); 
// console.log(pAequor.dna);
// console.log(pAequor.mutate());
// console.log(pAequor.compareDNA(pAequor2));