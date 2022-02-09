<template>
  <div class="bing-demo">
    <div class="box">
      <div class="head">
        <div class="face">

          <div class="round-group">
            <div class="round round-1">
              <div class="round round-2">
                <div class="round round-3">
                  <div class="round round-4">
                    <div class="round round-5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="body">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      faceR: 40,
      colorGap: 5,
      colors: ['blue', 'yellow', 'black', 'green', 'red']
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">


$roundR: 100px;
$roundGap: 5px;
$line: 3px;

.round-group {
  width: $roundR;
  height: $roundR;
}

.round{
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: $roundGap;
  border: $line solid;
  border-radius: 100%;
}

.round-1 {
  border-color: #0885c2;
}

.round-2 {
  border-color: #000000;
}

.round-3 {
  border-color: #ed334e;
}

.round-4 {
  border-color: #fbb132;
}

.round-5 {
  border-color: #1c8b3c;
}
</style>
