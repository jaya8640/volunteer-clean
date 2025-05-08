<thead>
            <tr>
                @foreach ($tableHead as $head)
                    
                    <th
                        class="whitespace-nowrap bg-slate-200  font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                        {{$head}}
                    </th>

                @endforeach
                
            </tr>
</thead>
