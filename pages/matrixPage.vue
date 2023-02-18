<template>
  <v-dialog
      v-model="dialog">
    <v-card>
      <v-card-title>
        Загрузка из текста
      </v-card-title>
      <v-card-subtitle>
        вфцвфцы
      </v-card-subtitle>
      <v-card-text>
        <v-textarea v-model="txtMatrix">
        </v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary"  @click="dialog = false; txtToMatrix(txtMatrix)">Сохранить</v-btn>
        <v-btn color="warning"  @click="dialog = false">Закрыть без сохранения</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div class="mt-4 ml-4 mb-4">
    <v-card
        max-width="500px">
      <v-card-title>
        Колличество станков и деталей
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
                label="Колличество столбцов"
                v-model="countCols">
            </v-text-field>
            <v-text-field
                label="Колличество строк"
                v-model="countRows">
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-col>
          <v-btn
              variant="outlined"
              class="mb-2">
            Загрузить матрицу из файла
          </v-btn>
          <v-btn
              variant="outlined"
              class="ml-0"
              @click="dialog = true">
            Загрузить матрицу из текста
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </div>

  <v-row>
    <v-col></v-col>
    <v-col v-for="(col,i) in matrix[0]">
      <v-card-title>Станок {{ i + 1 }}</v-card-title>
    </v-col>
  </v-row>
  <v-row v-for="(row,i) in matrix">
    <v-card-title>Деталь {{ i + 1 }}</v-card-title>
    <v-col v-for="(col,j) in row">
      <v-text-field
          variant="solo"
          v-model="matrix[i][j]"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const dialog = ref()
const txtMatrix=ref()
const countRows = ref()
const countCols = ref()
const matrix = ref([
  [1, 2, 3],
  [3, 2, 1],
  [3, 2, 1],
  [3, 2, 1]
])
watch(matrix,() => {
  countRows.value = matrix.value.length;
  countCols.value = matrix.value[0].length;
},{immediate: true})


watch([countRows, countCols], ([newRows, newCols]) => {
  for (let i = 0; i < newRows; i++) {
    if (!matrix.value[i]) matrix.value[i] = []
    for (let j = 0; j < newCols; j++) {
      if (!matrix.value[i][j]) matrix.value[i][j] = 0
    }
    matrix.value[i].splice(newCols)
  }
  matrix.value.splice(newRows)
}, {immediate: true})

function txtToMatrix(txtMatrix:string) {
  let lines=txtMatrix.split(/\r?\n/);
  let matrixFromTxt= [] as number[][]
  lines.forEach(value => {
    matrixFromTxt.push(Array.from(value.split(" ")).map(item=>+item));
  });
  matrix.value=matrixFromTxt
}
</script>

<style scoped>

</style>