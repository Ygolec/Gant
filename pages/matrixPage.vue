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
        <v-btn color="primary" @click="dialog = false; txtToMatrix(txtMatrix)">Сохранить</v-btn>
        <v-btn color="warning" @click="dialog = false">Закрыть без сохранения</v-btn>
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
          <v-file-input
          label="Загрузка из файла"
          v-model="file"
          @change="readFile()"></v-file-input>
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
<v-card>
  <v-card-text>
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
            v-model.number="matrix[i][j]"
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-card-text>
</v-card>


<v-expansion-panels
    multiple>
  <v-expansion-panel
  title="Стандартный режим">
    <v-expansion-panel-text>
      Порядок деталей :{{basicScheduling(matrix).map(key =>key+1)}}
      Общее время производства: {{maxChart}}
      <g-gantt-chart
          hide-timeaxis
          :chart-start="chartStart"
          :chart-end="chartEnd"
          bar-start="start"
          bar-end="end"
          precision="day"
          row-height="60"
          :grid="true"
      >
        <g-gantt-row
            v-for="(row,i) in chartMatrix"
            :label="`Станок ${i+1}`"
            :bars="row"
        />
      </g-gantt-chart>
    </v-expansion-panel-text>
  </v-expansion-panel>
  <v-expansion-panel
  title="Алгоритм Джонсона">
    <v-expansion-panel-text>
      Порядок деталей :{{johnsonScheduling(matrix).map(key =>key+1)}}
      Общее время производства: {{maxChart}}
      <g-gantt-chart
          hide-timeaxis
          :chart-start="chartStart"
          :chart-end="chartEnd"
          bar-start="start"
          bar-end="end"
          precision="day"
          row-height="60"
          :grid="true"
      >
        <g-gantt-row
            v-for="(row,i) in chartMatrix"
            :label="`Станок ${i+1}`"
            :bars="row"
        />
      </g-gantt-chart>
    </v-expansion-panel-text>
  </v-expansion-panel>
  <v-expansion-panel
  title="1 обощение Джонсона">
    <v-expansion-panel-text>
      Порядок деталей :{{firstJohnsonGeneralization(matrix).map(key =>key+1)}}
      Общее время производства: {{maxChart1}}
      <g-gantt-chart
          hide-timeaxis
          :chart-start="chartStart1"
          :chart-end="chartEnd1"
          bar-start="start"
          bar-end="end"
          precision="day"
          row-height="60"
          :grid="true"
      >
        <g-gantt-row
            v-for="(row,i) in chartMatrix1"
            :label="`Станок ${i+1}`"
            :bars="row"
        />
      </g-gantt-chart>
    </v-expansion-panel-text>
  </v-expansion-panel>
  <v-expansion-panel
  title="2 обощение Джонсона">
    <v-expansion-panel-text>
      Порядок деталей :{{secondJohnsonGeneralization(matrix).map(key =>key+1)}}
      Общее время производства: {{maxChart2}}
      <g-gantt-chart
          hide-timeaxis
          :chart-start="chartStart2"
          :chart-end="chartEnd2"
          bar-start="start"
          bar-end="end"
          precision="day"
          row-height="60"
          :grid="true"
      >
        <g-gantt-row
            v-for="(row,i) in chartMatrix2"
            :label="`Станок ${i+1}`"
            :bars="row"
        />
      </g-gantt-chart>
    </v-expansion-panel-text>
  </v-expansion-panel>
  <v-expansion-panel
  title="3 обощение Джонсона">
    <v-expansion-panel-text>
      Порядок деталей :{{thirdJohnsonGeneralization(matrix).map(key =>key+1)}}
      Общее время производства: {{maxChart3}}
      <g-gantt-chart
          hide-timeaxis
          :chart-start="chartStart3"
          :chart-end="chartEnd3"
          bar-start="start"
          bar-end="end"
          precision="day"
          row-height="60"
          :grid="true"
      >
        <g-gantt-row
            v-for="(row,i) in chartMatrix3"
            :label="`Станок ${i+1}`"
            :bars="row"
        />
      </g-gantt-chart>
    </v-expansion-panel-text>
  </v-expansion-panel>
  <v-expansion-panel
  title="4 обощение Джонсона">
    <v-expansion-panel-text>
      Порядок деталей :{{fourthJohnsonGeneralization(matrix).map(key =>key+1)}}
      Общее время производства: {{maxChart4}}
      <g-gantt-chart
          hide-timeaxis
          :chart-start="chartStart4"
          :chart-end="chartEnd4"
          bar-start="start"
          bar-end="end"
          precision="day"
          row-height="60"
          :grid="true"
      >
        <g-gantt-row
            v-for="(row,i) in chartMatrix4"
            :label="`Станок ${i+1}`"
            :bars="row"
        />
      </g-gantt-chart>
    </v-expansion-panel-text>
  </v-expansion-panel>
  <v-expansion-panel
  title="5 обощение Джонсона">
    <v-expansion-panel-text>
      Порядок деталей :{{fifthJohnsonGeneralization(matrix).map(key =>key+1)}}
      Общее время производства: {{maxChart5}}
      <g-gantt-chart
          hide-timeaxis
          :chart-start="chartStart5"
          :chart-end="chartEnd5"
          bar-start="start"
          bar-end="end"
          precision="day"
          row-height="60"
          :grid="true"
      >
        <g-gantt-row
            v-for="(row,i) in chartMatrix5"
            :label="`Станок ${i+1}`"
            :bars="row"
        />
      </g-gantt-chart>
    </v-expansion-panel-text>
  </v-expansion-panel>
</v-expansion-panels>
</template>


<script setup lang="ts">

import {generateSchedule} from "~/utils/charts";
import dayjs from "dayjs";
import {GGanttChart, GGanttRow} from "@infectoone/vue-ganttastic";
import {
  fifthJohnsonGeneralization,
  firstJohnsonGeneralization,
  fourthJohnsonGeneralization,
  secondJohnsonGeneralization,
  thirdJohnsonGeneralization
} from "~/utils/scheduling";

const dialog = ref()
const file=ref([])
const fileContent=ref()
const txtMatrix = ref()
const countRows = ref()
const countCols = ref()
const matrix = ref([
  [1, 2, 3],
  [3, 2, 1],
  [3, 2, 1],
  [3, 2, 1]
])
watch(matrix, () => {
  countRows.value = matrix.value.length;
  countCols.value = matrix.value[0].length;
}, {immediate: true})


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



function txtToMatrix(txtMatrix: string) {
  let lines = txtMatrix.split(/\r?\n/);
  let matrixFromTxt = [] as number[][]
  lines.forEach(value => {
    matrixFromTxt.push(Array.from(value.split(" ")).map(item => +item));
  });
  matrix.value = matrixFromTxt
}
async function readFile() {
  fileContent.value = await (file.value[0].text())
  txtToMatrix(fileContent.value);
}


//---------------------------------------------------------------------------------------------------------
const ganttMatrix=computed(()=>generateSchedule(matrix.value,basicScheduling(matrix.value)))
const chartMatrix=computed(()=>prepareChartData(ganttMatrix.value,dayjs().startOf("day").toDate()))

const chartStart = computed(() => {
  let end = chartMatrix.value.map(job => {
    return job.reduce((a, b) => {
      return a.start < b.start ? a : b
    })
  })
      .reduce((a, b) => {
        return a.start < b.start ? a : b
      })
      .start;
  return dayjs(end).subtract(12, 'h').toDate()
})

const chartEnd = computed(() => {
  let end = chartMatrix.value.map(job => {
    return job.reduce((a, b) => {
      return a.end > b.end ? a : b
    })
  })
      .reduce((a, b) => {
        return a.end > b.end ? a : b
      })
      .end;
  return dayjs(end).add(3, 'h').toDate()
})

const maxChart = computed(() => {
  let end = ganttMatrix.value.map(job => {
    return job.reduce((a, b) => {
      return a.end > b.end ? a : b
    })
  })
      .reduce((a, b) => {
        return a.end > b.end ? a : b
      })
      .end;
  return end
})
//---------------------------------------------------------------------------------------------------------
const ganttMatrix1=computed(()=>generateSchedule(matrix.value,firstJohnsonGeneralization(matrix.value)))
const chartMatrix1=computed(()=>prepareChartData(ganttMatrix1.value,dayjs().startOf("day").toDate()))

const chartStart1 = computed(() => {
  let end = chartMatrix1.value.map(job => {
    return job.reduce((a, b) => {
      return a.start < b.start ? a : b
    })
  })
      .reduce((a, b) => {
        return a.start < b.start ? a : b
      })
      .start;
  return dayjs(end).subtract(12, 'h').toDate()
})

const chartEnd1 = computed(() => {
  let end = chartMatrix1.value.map(job => {
    return job.reduce((a, b) => {
      return a.end > b.end ? a : b
    })
  })
      .reduce((a, b) => {
        return a.end > b.end ? a : b
      })
      .end;
  return dayjs(end).add(3, 'h').toDate()
})

const maxChart1 = computed(() => {
  let end = ganttMatrix1.value.map(job => {
    return job.reduce((a, b) => {
      return a.end > b.end ? a : b
    })
  })
      .reduce((a, b) => {
        return a.end > b.end ? a : b
      })
      .end;
  return end
})
//---------------------------------------------------------------------------------------------------------
const ganttMatrix2=computed(()=>generateSchedule(matrix.value,secondJohnsonGeneralization(matrix.value)))
const chartMatrix2=computed(()=>prepareChartData(ganttMatrix2.value,dayjs().startOf("day").toDate()))

const chartStart2 = computed(() => {
  let end = chartMatrix2.value.map(job => {
    return job.reduce((a, b) => {
      return a.start < b.start ? a : b
    })
  })
      .reduce((a, b) => {
        return a.start < b.start ? a : b
      })
      .start;
  return dayjs(end).subtract(12, 'h').toDate()
})

const chartEnd2 = computed(() => {
  let end = chartMatrix2.value.map(job => {
    return job.reduce((a, b) => {
      return a.end > b.end ? a : b
    })
  })
      .reduce((a, b) => {
        return a.end > b.end ? a : b
      })
      .end;
  return dayjs(end).add(3, 'h').toDate()
})

const maxChart2 = computed(() => {
  let end = ganttMatrix2.value.map(job => {
    return job.reduce((a, b) => {
      return a.end > b.end ? a : b
    })
  })
      .reduce((a, b) => {
        return a.end > b.end ? a : b
      })
      .end;
  return end
})
//---------------------------------------------------------------------------------------------------------
const ganttMatrix3=computed(()=>generateSchedule(matrix.value,thirdJohnsonGeneralization(matrix.value)))
const chartMatrix3=computed(()=>prepareChartData(ganttMatrix3.value,dayjs().startOf("day").toDate()))

const chartStart3 = computed(() => {
  let end = chartMatrix3.value.map(job => {
    return job.reduce((a, b) => {
      return a.start < b.start ? a : b
    })
  })
      .reduce((a, b) => {
        return a.start < b.start ? a : b
      })
      .start;
  return dayjs(end).subtract(12, 'h').toDate()
})

const chartEnd3 = computed(() => {
  let end = chartMatrix3.value.map(job => {
    return job.reduce((a, b) => {
      return a.end > b.end ? a : b
    })
  })
      .reduce((a, b) => {
        return a.end > b.end ? a : b
      })
      .end;
  return dayjs(end).add(3, 'h').toDate()
})

const maxChart3 = computed(() => {
  let end = ganttMatrix3.value.map(job => {
    return job.reduce((a, b) => {
      return a.end > b.end ? a : b
    })
  })
      .reduce((a, b) => {
        return a.end > b.end ? a : b
      })
      .end;
  return end
})
//---------------------------------------------------------------------------------------------------------
const ganttMatrix4=computed(()=>generateSchedule(matrix.value,fourthJohnsonGeneralization(matrix.value)))
const chartMatrix4=computed(()=>prepareChartData(ganttMatrix4.value,dayjs().startOf("day").toDate()))

const chartStart4 = computed(() => {
  let end = chartMatrix4.value.map(job => {
    return job.reduce((a, b) => {
      return a.start < b.start ? a : b
    })
  })
      .reduce((a, b) => {
        return a.start < b.start ? a : b
      })
      .start;
  return dayjs(end).subtract(12, 'h').toDate()
})

const chartEnd4 = computed(() => {
  let end = chartMatrix4.value.map(job => {
    return job.reduce((a, b) => {
      return a.end > b.end ? a : b
    })
  })
      .reduce((a, b) => {
        return a.end > b.end ? a : b
      })
      .end;
  return dayjs(end).add(3, 'h').toDate()
})

const maxChart4 = computed(() => {
  let end = ganttMatrix4.value.map(job => {
    return job.reduce((a, b) => {
      return a.end > b.end ? a : b
    })
  })
      .reduce((a, b) => {
        return a.end > b.end ? a : b
      })
      .end;
  return end
})
//---------------------------------------------------------------------------------------------------------
const ganttMatrix5=computed(()=>generateSchedule(matrix.value,fifthJohnsonGeneralization(matrix.value)))
const chartMatrix5=computed(()=>prepareChartData(ganttMatrix5.value,dayjs().startOf("day").toDate()))

const chartStart5 = computed(() => {
  let end = chartMatrix5.value.map(job => {
    return job.reduce((a, b) => {
      return a.start < b.start ? a : b
    })
  })
      .reduce((a, b) => {
        return a.start < b.start ? a : b
      })
      .start;
  return dayjs(end).subtract(12, 'h').toDate()
})

const chartEnd5 = computed(() => {
  let end = chartMatrix5.value.map(job => {
    return job.reduce((a, b) => {
      return a.end > b.end ? a : b
    })
  })
      .reduce((a, b) => {
        return a.end > b.end ? a : b
      })
      .end;
  return dayjs(end).add(3, 'h').toDate()
})

const maxChart5 = computed(() => {
  let end = ganttMatrix5.value.map(job => {
    return job.reduce((a, b) => {
      return a.end > b.end ? a : b
    })
  })
      .reduce((a, b) => {
        return a.end > b.end ? a : b
      })
      .end;
  return end
})

</script>

<style lang="scss" scoped>

</style>